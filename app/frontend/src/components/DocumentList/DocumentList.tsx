import React, { useState, ChangeEvent, useEffect } from "react";
import { listUploadedFilesApiICTkb } from "../../api";
import styles from "./DocumentList.module.css";
import { Callout, Label, Text } from "@fluentui/react";
import { Button } from "@fluentui/react-components";
import { FolderFilled } from "@fluentui/react-icons";
import { SparkleFilled } from "@fluentui/react-icons";
import { DismissSquareRegular } from "@fluentui/react-icons";
import { Stack, Pivot, PivotItem } from "@fluentui/react";
import { useMsal } from "@azure/msal-react";
import { useLogin, getToken } from "../../authConfig";
import { getHeaders } from "../../api";

interface Props {
    className?: string;
}

export const DocumentList = ({ className }: Props) => {
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [isCalloutVisible, setIsCalloutVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isPivotShow, setIsPivotShow] = useState<boolean>(false);
    const [citation, setCitation] = useState("");
    const [citationURL, setCitationURL] = useState("");
    const client = useLogin ? useMsal().instance : undefined;

    const handleButtonClick = async () => {
        setIsCalloutVisible(!isCalloutVisible);
        listUploadedFiles();
    };

    const listUploadedFiles = async () => {
        listUploadedFilesApiICTkb().then(files => {
            setIsLoading(false);
            setUploadedFiles(files);
        });
    };

    const fetchCitation = async () => {
        const token = client ? await getToken(client) : undefined;
        if (citation) {
            let citation2 = "./content/" + citation;
            // Get hash from the URL as it may contain #page=N
            // which helps browser PDF renderer jump to correct page N
            const originalHash = citation2.indexOf("#") ? citation2.split("#")[1] : "";
            const response = await fetch(citation2, {
                method: "GET",
                headers: await getHeaders(token)
            });
            const citationContent = await response.blob();
            let citationObjectUrl = URL.createObjectURL(citationContent);
            // Add hash back to the new blob URL
            if (originalHash) {
                citationObjectUrl += "#" + originalHash;
            }
            setCitationURL(citationObjectUrl);
            window.open(citationObjectUrl, "_blank", "noreferrer");
        }
    };

    useEffect(() => {
        fetchCitation();
    }, [citation]);

    // const renderFileViewer = () => {
    //     return <iframe title="Citation" src={citationURL} width="100%" height="100%" />;
    // };

    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button icon={<FolderFilled fontFamily="" primaryFill={"rgb(255, 165, 0)"} />} onClick={handleButtonClick}>
                {"Knowledge Scope"}
            </Button>

            {isCalloutVisible && (
                <Callout
                    role="dialog"
                    gapSpace={0}
                    className={styles.callout}
                    target="#calloutButton"
                    onDismiss={() => {
                        setIsCalloutVisible(false), setIsPivotShow(false);
                    }}
                    setInitialFocus
                >
                    <DismissSquareRegular
                        fontSize={"2.188rem"}
                        primaryFill={"rgba(40, 40, 40, 0.8)"}
                        className={styles.documentlist_dismiss}
                        onClick={() => {
                            setIsCalloutVisible(false);
                        }}
                    ></DismissSquareRegular>
                    <h3 className={styles.documentlist_KnowledgeTitle}>
                        Knowledge Scope <SparkleFilled fontSize={"1.875rem"} primaryFill={"#0072af"} />
                    </h3>
                    {isLoading && <h4 className={styles.documentlist_loading}>Loading...</h4>}
                    <div className={styles.documentlist_counter}>
                        <p>
                            Training files = {uploadedFiles.length} <br />
                            Click and wait for the file loading
                        </p>
                    </div>
                    {uploadedFiles.map((filename, index) => {
                        return (
                            <ul className={styles.documentlist_ul} key={index}>
                                <li
                                    className={styles.documentlist_li}
                                    onClick={() => {
                                        setCitation(filename);
                                        setIsPivotShow(true);
                                    }}
                                >
                                    {filename}
                                </li>
                            </ul>
                        );
                    })}
                </Callout>
            )}
            {/* {isPivotShow && (
                <Pivot className={styles.documentlist_citationcontainer}>
                    <PivotItem className={styles.documentlist_citationcontent} headerText={citation}>
                        {renderFileViewer()}
                    </PivotItem>
                </Pivot>
            )} */}
        </div>
    );
};
