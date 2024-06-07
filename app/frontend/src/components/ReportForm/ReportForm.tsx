import styles from "./ReportForm.module.css";
import { useEffect, useState } from "react";

export const ReportForm = () => {
    let User = "";
    let Message = "";
    let History = "";
    const [IsSentMessageVisible, setIsIsSentMessageVisible] = useState(false);

    function prepareRequest(e: any) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                User: e.target.from_name.value + " " + e.target.from_surname.value,
                Message: e.target.message.value,
                History: e.target.jsoncode.value
            })
        };
        return requestOptions;
    }
    //FlowName: ChatICTV3:Log_AddUserReport
    async function SendUserQueryToAutomateFlow(e: any) {
        console.log("Send this files:\n" + User + " " + Message + " " + History);
        const response = await fetch(
            "https://prod-21.westeurope.logic.azure.com:443/workflows/3b99cabfae2d45b08cdc9d08066c8cad/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lraGJxzl0nj334Y5QfTt_bIbtRSn_fuwi72L-bTh2eo",
            prepareRequest(e)
        );
        if (!response.ok) {
            throw new Error(`automate response was not ok: ${response.status}`);
        }
        return await response.json();
    }

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        SendUserQueryToAutomateFlow(e);
        setIsIsSentMessageVisible(true);
        e.target.reset();
    };

    return (
        <div className={styles.formBody}>
            <form className={styles.formContainer} onSubmit={handleOnSubmit}>
                {IsSentMessageVisible && (
                    <div style={{ color: "green", fontWeight: "bold", textAlign: "center", fontSize: "25px" }}>Your report has been sent successfully!</div>
                )}
                <h2>Report hallucination</h2>
                <p>Please, open the "Thought process" and copy the JSON string of the step "Prompt to generate answer" </p>
                <div className={styles.formElement}>
                    <label>
                        Name<strong style={{ color: "red" }}>*</strong>
                    </label>
                    <input type="text" id="from_name" name="from_name" placeholder="Your name.." required />
                </div>
                <div className={styles.formElement}>
                    <label>
                        Surname<strong style={{ color: "red" }}>*</strong>
                    </label>
                    <input type="text" id="from_surname" name="from_surname" placeholder="Your name.." required />
                </div>
                <div className={styles.formElement}>
                    <label>
                        Message<strong style={{ color: "red" }}>*</strong>
                    </label>
                    <textarea
                        name="message"
                        placeholder="Describe the issue..."
                        required
                        onChange={() => {
                            console.log("Changed name");
                            setIsIsSentMessageVisible(false);
                        }}
                    />
                </div>
                <div className={styles.formElement}>
                    <label>Json string</label>
                    <textarea name="jsoncode" placeholder="Paste a JSON string" rows={20} />
                </div>
                <button type="submit" className={styles.formButton}>
                    Submit
                </button>
            </form>
        </div>
    );
};
