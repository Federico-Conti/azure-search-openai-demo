import { useState, useEffect, useContext } from "react";
import { Stack, TextField } from "@fluentui/react";
import { Button, Tooltip } from "@fluentui/react-components";
import { Send28Filled } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { useMsal } from "@azure/msal-react"; //ICT_PATCH/automate_query_log
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

//ICT_PATCH/automate_query_log
type Claim = {
    name: string;
    value: string;
};

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
    const ToString = (a: string | any) => {
        if (typeof a === "string") {
            return a;
        } else {
            return JSON.stringify(a);
        }
    };
    //ICT_PATCH/automate_query_log
    let createClaims = (o: Record<string, unknown> | undefined) => {
        return Object.keys(o ?? {}).map((key: string) => {
            let originalKey = key;
            try {
                // Some claim names may be a URL to a full schema, just use the last part of the URL in this case
                const url = new URL(key);
                const parts = url.pathname.split("/");
                key = parts[parts.length - 1];
            } catch (error) {
                // Do not parse key if it's not a URL
            }
            return { name: key, value: ToString((o ?? {})[originalKey]) };
        });
    };

    //ICT_PATCH/automate_query_log
    const oid: string = createClaims(claims)
        .filter(item => item.name === "objectidentifier")
        .map(item => item.value)[0];

    //ICT_PATCH/automate_query_log
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserQuery: question, User: oid })
    };

    //ICT_PATCH/automate_query_log
    async function SendUserQueryToAutomateFlow(): Promise<string> {
        const response = await fetch(automateFlowUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`automate response was not ok: ${response.status}`);
        }
        return await response.json();
    }
    const { t } = useTranslation();
    const [isComposing, setIsComposing] = useState(false);

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
        if (isComposing) return;

        if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            sendQuestion();
        }
    };

    const handleCompositionStart = () => {
        setIsComposing(true);
    };
    const handleCompositionEnd = () => {
        setIsComposing(false);
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
                placeholder={"To help protect your privacy, don't include personal information such as your name, phone number or email address."}
                multiline
                resizable={false}
                borderless
                value={question}
                onChange={onQuestionChange}
                onKeyDown={onEnterPress}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
            />
            {/* Aggiunto TextField per Mobile */}
            <TextField
                className={styles.questionInputTextAreaMobile}
                disabled={disableRequiredAccessControl}
                placeholder={"AI-generated content may be incorrect. Closely review what is generated."}
                multiline
                resizable={false}
                borderless
                value={question}
                onChange={onQuestionChange}
                onKeyDown={onEnterPress}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
            />
            <div className={styles.questionInputButtonsContainer}>
                <Tooltip content={t("tooltips.submitQuestion")} relationship="label">
                    <Button size="medium" icon={<Send28Filled primaryFill="#0072af" />} disabled={sendQuestionDisabled} onClick={sendQuestion} />
                </Tooltip>
            </div>
            {showSpeechInput && <SpeechInput updateQuestion={setQuestion} />}
            {/* Aggiunto Allert per informare l'utente che il chatbot può fare errori */}
            <div className={styles.questionInputAllert}>
                <p className={styles.questionInputAllertText}>AI-generated content may be incorrect. Closely review what is generated.</p>
                {/* <p className={styles.questionInputAllertText}>ChatICT can make mistakes, but people from ICT team can make worse ones &#128512;</p> */}
            </div>
        </Stack>
    );
};
