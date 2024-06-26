import { makeStyles, Body1, Caption1, Button, Divider } from "@fluentui/react-components";
import { ArrowReplyRegular, ArrowForwardFilled } from "@fluentui/react-icons";
import { Card, CardFooter, CardHeader, CardPreview } from "@fluentui/react-components";
import { BotSparkleFilled } from "@fluentui/react-icons";
import { DeleteFilled } from "@fluentui/react-icons";
import { FolderFilled } from "@fluentui/react-icons";
import { ClipboardBulletListLtrRegular } from "@fluentui/react-icons";
import style from "./AboutCard.module.css";
import React, { useState, ChangeEvent, useEffect } from "react";

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
    const [showCard2, setShowCard2] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        if (counter === 0) {
            setTitle("Introduction");
            setShowCard1(true);
            setShowCard2(false);
        } else if (counter === 1) {
            setTitle("UI Description");
            setShowCard1(false);
            setShowCard2(true);
        }
    }, [counter]);

    return (
        <Card className={styles.card}>
            <CardHeader
                image={<BotSparkleFilled fontSize={"40px"} primaryFill={""} aria-hidden="true" aria-label="Chat logo" />}
                header={
                    <Body1>
                        <b>ChatICT</b> mentioned you
                    </Body1>
                }
                description={
                    <Caption1>
                        About me - <strong>{title}</strong>
                    </Caption1>
                }
            />

            {showCard1 && (
                <CardPreview style={{ margin: "10px" }}>
                    <div>
                        <p>
                            Applying our expertise around Large Language Models, we have realized a sample application for the Retrieval-Augmented Generation
                            pattern running in Azure, using Azure AI Search for retrieval and Azure OpenAI large language models to power ChatGPT-style and Q&A
                            experiences.
                        </p>
                        <p>
                            ChatICT is an initial POC application that integrates a Generative AI technology with ICT service knowledge stored in our policies,
                            procedures, and user guides providing an interactive experience that efficiently retrieves answers from documents.
                        </p>
                        V3.0 features:
                        <ul>
                            <li>
                                <p>
                                    <strong style={{ fontWeight: "bolder" }}>Text Analyses</strong>: ChatICT analyzes user inputs to identify their requests and
                                    questions, ensuring that responses are adapt to the appropriate context and language.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong style={{ fontWeight: "bolder" }}> Hybrid Search</strong>: ChatICT extracts and collects relevant information from
                                    the knowledge base of the Information Communication Technology Directorate (User Guides, Policy, and Procedures) using
                                    advanced vector search algorithms.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong style={{ fontWeight: "bolder" }}>Generative Answers</strong> ChatICT uses GPT-3.5-turbo model calls to provide
                                    answers based on the retrieved documents and the user's query history.
                                </p>
                            </li>
                        </ul>
                    </div>
                </CardPreview>
            )}

            {showCard2 && (
                <CardPreview style={{ margin: "10px" }}>
                    <ul style={{ listStyleType: "none" }}>
                        <li>
                            <p>
                                <DeleteFilled primaryFill={"rgb(66, 73, 73)"} fontSize={"22px"} />
                                Clear button <br />
                                <br /> Clear Chat History <br />
                                <i style={{ fontSize: "16px", fontFamily: "italic" }}>
                                    (Ensure you clear the history before addressing a new argument for a cleaner response)
                                </i>
                            </p>
                        </li>
                        <li>
                            <Divider />
                            <p>
                                <FolderFilled fontFamily="" primaryFill={"rgb(255, 165, 0)"} fontSize={"22px"} />
                                Knwoledge Scope <br /> <br /> When selecting 'Knowledge scope,' all files that can be retrieved from the model will be listed.
                            </p>
                        </li>
                        <li>
                            <Divider />
                            <p>
                                <span style={{ fontWeight: "600" }}>Citations: </span>
                                <span className={style.aboutCard_citation}>1. This is a citation</span>
                                <br /> <br />
                                Within the response, there will be a clickable link to the reference file.
                            </p>
                        </li>
                    </ul>
                </CardPreview>
            )}

            <CardFooter style={{ marginLeft: "auto" }}>
                <Button
                    icon={
                        <ArrowReplyRegular
                            fontSize={40}
                            onClick={() => {
                                counter > 0 ? setCounter(counter - 1) : setCounter(counter);
                            }}
                        />
                    }
                ></Button>
                <Button
                    icon={
                        <ArrowForwardFilled
                            fontSize={40}
                            onClick={() => {
                                counter < 1 ? setCounter(counter + 1) : setCounter(counter);
                            }}
                        />
                    }
                ></Button>
            </CardFooter>
        </Card>
    );
};
