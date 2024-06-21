import { makeStyles, Body1, Caption1, Button } from "@fluentui/react-components";
import { ArrowReplyRegular, ArrowForwardFilled } from "@fluentui/react-icons";
import { Card, CardFooter, CardHeader, CardPreview } from "@fluentui/react-components";
import { BotSparkleFilled } from "@fluentui/react-icons";
import React, { useState, ChangeEvent } from "react";

const resolveAsset = (asset: string) => {
    const ASSET_URL = "https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/";

    return `${ASSET_URL}${asset}`;
};

const useStyles = makeStyles({
    card: {
        width: "720px",
        maxWidth: "100%"
    }
});

export const AboutCard = () => {
    const styles = useStyles();
    const [showCard1, setShowCard1] = useState<boolean>(true);

    const sendNext = () => () => setShowCard1(true);
    return (
        <Card className={styles.card}>
            <CardHeader
                image={<BotSparkleFilled fontSize={"50px"} primaryFill={"rgba(200, 0, 0)"} aria-hidden="true" aria-label="Chat logo" />}
                header={
                    <Body1>
                        <b>ChatICT</b> mentioned you
                    </Body1>
                }
                description={<Caption1>5h ago · About me - Description</Caption1>}
            />

            {showCard1 && (
                <CardPreview style={{ margin: "10px" }}>
                    <div>
                        <p>
                            Applying our expertise around Large Language Models and leveraging Retrieval Augmented Generation approach (RAG), we have realized a
                            first pilot of a chatbot (ChatICT) that we are glad to offer as a frontline point of contact for our ICT Service Desk.
                        </p>
                        <p>
                            Our ChatICT POC complements a traditional virtual assistant with Generative AI technology (gpt3.5 model with Hybrid search). This
                            way, it combines ICT service knowledge stored in our policies, procedures, and user guides with our experience on user interaction.
                        </p>
                        ChatICT is also accessible through the IIT MS-Teams platform and is able to do the following:
                        <ul>
                            <li>
                                <strong style={{ fontWeight: "bolder" }}>Text Analyses</strong>: ChatICT can analyze what the user writes to determine their
                                requests and questions.
                            </li>
                            <li>
                                <strong style={{ fontWeight: "bolder" }}> Generative Answers based on Keyword Search</strong>: ChatICT extracts and collects
                                relevant information from the knowledge base of the Information Communication Technology Directorate (User Guides, Policy, and
                                Procedures){" "}
                            </li>
                            <li>
                                <strong style={{ fontWeight: "bolder" }}>LLM</strong> ChatICT uses API calls to interact with an Azure OpenAI endpoint
                                instantiated in Switzerland, on which the GPT-35-Turbo model has been deployed.
                            </li>
                        </ul>
                    </div>
                </CardPreview>
            )}

            <CardFooter style={{ marginLeft: "auto" }}>
                <Button icon={<ArrowReplyRegular fontSize={40} />}></Button>
                <Button icon={<ArrowForwardFilled fontSize={40} />} onClick={sendNext()}></Button>
            </CardFooter>
        </Card>
    );
};
