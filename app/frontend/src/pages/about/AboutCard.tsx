import { makeStyles, Body1, Caption1, Button, Divider } from "@fluentui/react-components";
import { ArrowReplyRegular, ArrowForwardFilled } from "@fluentui/react-icons";
import { Card, CardFooter, CardHeader, CardPreview } from "@fluentui/react-components";
import { BotSparkleFilled } from "@fluentui/react-icons";
import { DeleteFilled } from "@fluentui/react-icons";
import { FolderFilled } from "@fluentui/react-icons";
import style from "./AboutCard.module.css";
import React, { useState, ChangeEvent, useEffect } from "react";

const useStyles = makeStyles({
    card: {
        width: "720px",
        maxWidth: "100%",
        backgroundColor: "white"
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
                image={<BotSparkleFilled fontSize={"40px"} primaryFill={"rgba(40, 40, 40, 0.8)"} aria-hidden="true" aria-label="Chat logo" />}
                header={
                    <Body1>
                        <b>ChatICT</b>
                    </Body1>
                }
                description={
                    <Caption1>
                        About - <strong>{title}</strong>
                    </Caption1>
                }
            />

            {showCard1 && (
                <CardPreview style={{ margin: "10px" }}>
                    <div>
                        <p>
                            ChatICT is a POC of chatbot, realized by ICT Directorate by applying its expertise around Generative AI. It implements a RAG
                            (Retrieval Augmented Generation) pattern and runs on MS-Azure platform by exploiting different Azure Cognitive Services, in
                            particular: Azure Storage as cloud container, Azure Ai Search as vector db, and LLM models such as Azure OpenAI.
                        </p>
                        <p>
                            ChatICT is a first pilot of an open-book application. It exploits Generative AI technology by integrating the knowledge of our ICT
                            services stored in policies, procedures, user guides, and other technical documents, providing an interactive experience that
                            efficiently retrieves answers 'ready for users' from Knowledge Scope.
                        </p>
                        Main features:
                        <ul>
                            <li>
                                <p>
                                    <strong style={{ fontWeight: "bolder" }}>Input Analysis and Generative Answers: </strong>ChatICT analyzes user inputs to
                                    identify their requests and questions, ensuring that the answers, based on history and retrieved documents, are expressed in
                                    the same language and appropriate to the context. To this end it adopts specific prompt engineering techniques and the
                                    gpt-35-turbo model.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong style={{ fontWeight: "bolder" }}> Hybrid Search on Customized Knowledge: </strong>ChatICT has been re-trained with a
                                    specific ICT document set. Using advanced vector search algorithms and the text-embedding-ada-002 model, it extracts and
                                    collects relevant information from the ICT knowledge base.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong style={{ fontWeight: "bolder" }}> Multi-language support: </strong>
                                    Answers will be more accurate when interacting with the chatbot in English, the default language of GPT model. Questions
                                    asked in languages other than English will be automatically translated by the model, which may result in variations of its
                                    behaviour.
                                </p>
                            </li>
                        </ul>
                    </div>
                </CardPreview>
            )}

            {showCard2 && (
                <CardPreview style={{ margin: "10px" }}>
                    <ul>
                        <li>
                            <p>
                                ChatICT has been re-trained with a specific ICT document set. A detailed list of such documents can be found by clicking the
                                “Knowledge Scope” button.
                            </p>
                            <p style={{ textAlign: "center" }}>
                                <FolderFilled fontFamily="" primaryFill={"rgb(255, 165, 0)"} fontSize={"22px"} />
                                Knwoledge Scope
                            </p>
                        </li>
                        <li>
                            <p>
                                During the interaction, ChatICT memorizes previous questions and answers to provide a context for subsequent queries. <br />
                                <i style={{ fontSize: "16px", fontFamily: "italic" }}>
                                    (To get a clearer response, make sure you clear your history before approaching a new topic.)
                                </i>
                            </p>
                            <p style={{ textAlign: "center" }}>
                                <DeleteFilled primaryFill={"rgb(66, 73, 73)"} fontSize={"22px"} />
                                Clear chat
                            </p>
                        </li>

                        <li>
                            <p>
                                To evaluate an answer:
                                <ol>
                                    <li> Click on the reference file provided with the answer.</li>
                                    <li> Check the contents against the official guide </li>
                                </ol>
                                <br />
                                If the model does not provide any references, or if the references lead to a non-existing file, consider the answer potentially
                                incorrect.
                            </p>
                            <p style={{ textAlign: "center" }}>
                                <span style={{ fontWeight: "600" }}>Citations: </span>
                                <span className={style.aboutCard_citation}>1. This is a reference</span>
                            </p>

                            <i style={{ fontSize: "16px", fontFamily: "italic" }}>
                                (If you are not satisfied with the answer ChatICT has provided, you could try to rephrase the question. The answers provided by
                                the model are not deterministic, with some different information in the input, the output may change and provide better
                                results.)
                            </i>
                        </li>
                    </ul>
                </CardPreview>
            )}

            <CardFooter style={{ marginLeft: "auto" }}>
                <Button
                    style={{ display: counter < 1 ? "none" : "" }}
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
                    style={{ display: counter >= 1 ? "none" : "" }}
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
