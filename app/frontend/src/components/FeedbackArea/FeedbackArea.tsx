import { useState } from "react";
import { Button, Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogContent } from "@fluentui/react-components";

import styles from "./FeedbackArea.module.css";

const automateFlowUrl = "";
export const FeedbackArea = () => {
    const [isSentFeedbackVisible, setIsSentFeedbackVisible] = useState(false);

    function prepareRequest(e: any) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Radio: e.target.feed.value,
                Message: e.target.feedarea.value
            })
        };
        return requestOptions;
    }
    async function SendUserFeedbackToAutomateFlow(e: any) {
        const response = await fetch(automateFlowUrl, prepareRequest(e));
        if (!response.ok) {
            throw new Error(`automate response was not ok: ${response.status}`);
        }
        return await response.json();
    }

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        SendUserFeedbackToAutomateFlow(e);
        setIsSentFeedbackVisible(true);
        e.target.reset();
    };
    return (
        <Dialog>
            <DialogTrigger disableButtonEnhancement>
                <Button className={styles.feed_triggerbutton} onClick={() => setIsSentFeedbackVisible(false)}>
                    Feedback
                </Button>
            </DialogTrigger>
            <DialogSurface className={styles.feed_dialogcontent}>
                <DialogBody>
                    {!isSentFeedbackVisible && (
                        <DialogTitle as="h1" className={styles.feed_dialogtitle}>
                            Help us improve the experience
                        </DialogTitle>
                    )}
                    {isSentFeedbackVisible && (
                        <DialogTitle as="h1" className={styles.feed_dialogtitle}>
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
                                {/* <Button className={styles.feed_formButton} type="submit">
                                Submit
                            </Button> */}
                            </form>

                            {!isSentFeedbackVisible && (
                                <div style={{ margin: "10px" }}>
                                    <p style={{ fontSize: "10px" }}>
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
                            <Button className={styles.feed_disablebutton}>Close</Button>
                        </DialogTrigger>
                    </DialogActions>
                    {!isSentFeedbackVisible && (
                        <DialogActions position="start">
                            <Button className={styles.feed_submitbutton} type="submit" form="feedbackform">
                                Submit
                            </Button>
                        </DialogActions>
                    )}
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
