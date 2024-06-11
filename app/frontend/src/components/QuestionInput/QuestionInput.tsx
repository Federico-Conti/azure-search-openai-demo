import { useState, useEffect } from "react";
import { Stack, TextField } from "@fluentui/react";
import { Button, Tooltip } from "@fluentui/react-components";
import { Send28Filled } from "@fluentui/react-icons";
import { useMsal } from "@azure/msal-react";

import { isLoggedIn, requireLogin } from "../../authConfig";
import styles from "./QuestionInput.module.css";
import { SpeechInput } from "./SpeechInput";
import { appServicesToken, appServicesLogout } from "../../authConfig"; //ICT_PATCH/automate_query_log

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
    const { instance } = useMsal(); //ICT_PATCH/automate_query_log (era riga 73)
    const activeAccount = instance.getActiveAccount(); //ICT_PATCH/automate_query_log

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserQuery: question, UserEmail: `${activeAccount?.username ?? appServicesToken?.user_claims?.preferred_username}` })
    };

    //FlowName: ChatICTV3:Log_AddUserQuery
    async function SendUserQueryToAutomateFlow(): Promise<string> {
        const response = await fetch(
            "https://prod-66.westeurope.logic.azure.com:443/workflows/f75884186a1342abae5d51041a04a9d6/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yBH14qZDakJDfcMlsacg0WDLIi0PRPe29ZU9leFnRG0",
            requestOptions
        );
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

    const disableRequiredAccessControl = requireLogin && !isLoggedIn(instance);
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
                    <Button size="large" icon={<Send28Filled primaryFill="#ba000d" />} disabled={sendQuestionDisabled} onClick={sendQuestion} />
                </Tooltip>
            </div>
            {showSpeechInput && <SpeechInput updateQuestion={setQuestion} />}
        </Stack>
    );
};
