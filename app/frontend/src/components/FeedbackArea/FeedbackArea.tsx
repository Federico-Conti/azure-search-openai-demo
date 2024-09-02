import { useState, useEffect } from "react";
import { makeStyles, Button, Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogContent } from "@fluentui/react-components";
import styles from "./FeedbackArea.module.css";
import { useMsal } from "@azure/msal-react";
import { getTokenClaims } from "../../authConfig";

const useStyles = makeStyles({
    feed_dialogtitle: {
        fontSize: "16px",
        fontWeight: "700"
    }
});

type Claim = {
    name: string;
    value: string;
};

export const FeedbackArea = () => {
    const stylesFU = useStyles();
    const [isSentFeedbackVisible, setIsSentFeedbackVisible] = useState(false);
    const { instance } = useMsal();
    const [claims, setClaims] = useState<Record<string, unknown> | undefined>(undefined);

    const automateFlowUrl = "";

    useEffect(() => {
        const fetchClaims = async () => {
            setClaims(await getTokenClaims(instance));
        };

        fetchClaims();
    }, []);
    //
    const ToString = (a: string | any) => {
        if (typeof a === "string") {
            return a;
        } else {
            return JSON.stringify(a);
        }
    };

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

    function prepareRequest(e: any, oid: string) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                User: oid,
                Choice: e.target.feed.value,
                Message: e.target.feedarea.value
            })
        };
        return requestOptions;
    }
    async function SendUserFeedbackToAutomateFlow(e: any, oid: string) {
        const response = await fetch(automateFlowUrl, prepareRequest(e, oid));
        if (!response.ok) {
            throw new Error(`automate response was not ok: ${response.status}`);
        }
        return await response.json();
    }

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        let item: Claim[] = createClaims(claims);
        let oid: string = item.filter(item => item.name === "objectidentifier").map(item => item.value)[0];
        SendUserFeedbackToAutomateFlow(e, oid);
        setIsSentFeedbackVisible(true);
        e.target.reset();
    };
    return (
        <Dialog>
            <DialogTrigger disableButtonEnhancement>
                <Button
                    style={{
                        color: "white",
                        alignItems: "center",
                        fontSize: "14px",
                        fontWeight: "400",
                        backgroundColor: "#7376e1",
                        height: "23px",
                        width: "23px"
                    }}
                    onClick={() => setIsSentFeedbackVisible(false)}
                >
                    Feedback
                </Button>
            </DialogTrigger>
            <DialogSurface style={{ backgroundColor: "#f2f2f2" }}>
                <DialogBody>
                    {!isSentFeedbackVisible && (
                        <DialogTitle as="h1" className={stylesFU.feed_dialogtitle}>
                            Help us improve the experience
                        </DialogTitle>
                    )}
                    {isSentFeedbackVisible && (
                        <DialogTitle as="h1" className={stylesFU.feed_dialogtitle}>
                            Feedback submitted
                        </DialogTitle>
                    )}
                    {isSentFeedbackVisible && (
                        <DialogContent>
                            <p style={{ fontSize: "small" }}>Thanks for helping ChatICT improve!</p>
                        </DialogContent>
                    )}
                    {!isSentFeedbackVisible && (
                        <DialogContent>
                            <form id="feedbackform" className={styles.feed_formContainer} onSubmit={handleOnSubmit}>
                                <div className={styles.feed_radioGroup}>
                                    <div className={styles.feed_formElement}>
                                        <input type="radio" value="like" name="feed" defaultChecked />
                                        <label htmlFor="">Like</label>
                                    </div>
                                    <div className={styles.feed_formElement}>
                                        <input type="radio" value="dislike" name="feed" />
                                        <label htmlFor="">Dislike</label>
                                    </div>
                                    <div className={styles.feed_formElement}>
                                        <input type="radio" value="connection issue" name="feed" />
                                        <label htmlFor="">Connection issue</label>
                                    </div>
                                    <div className={styles.feed_formElement}>
                                        <input type="radio" value="slow response" name="feed" />
                                        <label htmlFor="">Slow response</label>
                                    </div>
                                    <div className={styles.feed_formElement}>
                                        <input type="radio" value="other" name="feed" />
                                        <label htmlFor="">Other</label>
                                    </div>
                                </div>

                                <textarea
                                    name="feedarea"
                                    id="feedtext"
                                    className={styles.feed_formTextArea}
                                    placeholder="Enter your feedback here. To help protect your privacy, don't include personal information such as your name, phone number or email address."
                                ></textarea>
                            </form>

                            {!isSentFeedbackVisible && (
                                <div style={{ margin: "10px" }}>
                                    <p style={{ fontSize: "11px" }}>
                                        <a
                                            href="https://intranet.iit.it/offices/information-and-communication-technology/computers-software/service-desk/chatict"
                                            target="_blank"
                                        >
                                            Privacy policy & Terms of use
                                        </a>
                                    </p>
                                </div>
                            )}
                        </DialogContent>
                    )}
                    <DialogActions position="end">
                        <DialogTrigger disableButtonEnhancement>
                            <Button
                                style={{
                                    color: "black",
                                    alignItems: "center",
                                    border: "2px solid #7376e1",
                                    borderRadius: "10px",
                                    height: "23px",
                                    width: "23px",
                                    fontSize: "small"
                                }}
                            >
                                Close
                            </Button>
                        </DialogTrigger>
                    </DialogActions>
                    {!isSentFeedbackVisible && (
                        <DialogActions position="start">
                            <Button
                                style={{
                                    color: "white",
                                    alignItems: "center",
                                    borderRadius: "10px",
                                    height: "23px",
                                    width: "23px",
                                    fontSize: "small",
                                    fontWeight: "500",
                                    backgroundColor: "#7376e1"
                                }}
                                type="submit"
                                form="feedbackform"
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    )}
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
