import { useState, useEffect, useContext } from "react";
import { Stack, TextField } from "@fluentui/react";
import { Button, Tooltip } from "@fluentui/react-components";
import { Send28Filled } from "@fluentui/react-icons";
import { useMsal } from "@azure/msal-react";

import styles from "./QuestionInput.module.css";
import { SpeechInput } from "./SpeechInput";
import { LoginContext } from "../../loginContext";
import { requireLogin } from "../../authConfig";
import { getTokenClaims } from "../../authConfig"; //ICT_PATCH/automate_query_log

interface Props {
    onSend: (question: string) => void;
    disabled: boolean;
    initQuestion?: string;
    placeholder?: string;
    clearOnSend?: boolean;
    showSpeechInput?: boolean;
}

export const QuestionInput = ({ onSend, disabled, placeholder, clearOnSend, initQuestion, showSpeechInput }: Props) => {
    const [question, setQuestion] = useState<string>("");
    const { loggedIn } = useContext(LoginContext);
    const [claims, setClaims] = useState<Record<string, unknown> | undefined>(undefined); //ICT_PATCH/automate_query_log
    const { instance } = useMsal(); //ICT_PATCH/automate_query_log (era riga 73)
    const automateFlowUrl = "";

    //ICT_PATCH/automate_query_log
    useEffect(() => {
        const fetchClaims = async () => {
            setClaims(await getTokenClaims(instance));
        };

        fetchClaims();
    }, []);

    //ICT_PATCH/automate_query_log
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserQuery: question, User: claims?.oid })
    };

    //ICT_PATCH/automate_query_log
    async function SendUserQueryToAutomateFlow(): Promise<string> {
        const response = await fetch(automateFlowUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`automate response was not ok: ${response.status}`);
        }
        return await response.json();
    }

    useEffect(() => {
        initQuestion && setQuestion(initQuestion);
    }, [initQuestion]);

    const sendQuestion = () => {
        if (disabled || !question.trim()) {
            return;
        }
        SendUserQueryToAutomateFlow(); //ICT_PATCH/automate_query_log
        onSend(question);

        if (clearOnSend) {
            setQuestion("");
        }
    };

    const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
        if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            sendQuestion();
        }
    };

    const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setQuestion("");
        } else if (newValue.length <= 1000) {
            setQuestion(newValue);
        }
    };

    const disableRequiredAccessControl = requireLogin && !loggedIn;
    const sendQuestionDisabled = disabled || !question.trim() || requireLogin;

    if (disableRequiredAccessControl) {
        placeholder = "Please login to continue...";
    }

    return (
        <Stack horizontal className={styles.questionInputContainer}>
            <TextField
                className={styles.questionInputTextArea}
                disabled={disableRequiredAccessControl}
                placeholder={placeholder}
                multiline
                resizable={false}
                borderless
                value={question}
                onChange={onQuestionChange}
                onKeyDown={onEnterPress}
            />
            <div className={styles.questionInputButtonsContainer}>
                <Tooltip content="Ask question button" relationship="label">
                    <Button size="medium" icon={<Send28Filled primaryFill="#0072af" />} disabled={sendQuestionDisabled} onClick={sendQuestion} />
                </Tooltip>
            </div>
            {showSpeechInput && <SpeechInput updateQuestion={setQuestion} />}
            {/* Aggiunto Allert per informare l'utente che il chatbot può fare errori */}
            <div className={styles.questionInputAllert}>
                <p className={styles.questionInputAllertText}>ChatICT can make mistakes. Closely review what it generates.</p>
                {/* <p className={styles.questionInputAllertText}>ChatICT can make mistakes, but people from ICT team can make worse ones &#128512;</p> */}
            </div>
        </Stack>
    );
};
