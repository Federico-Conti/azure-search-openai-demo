import React, { useState, ChangeEvent } from "react";
import { listUploadedFilesApiICTkb } from "../../api";
import styles from "./DocumentList.module.css";
import { Callout, Label, Text } from "@fluentui/react";
import { Button } from "@fluentui/react-components";
import { FolderFilled } from "@fluentui/react-icons";
import { SparkleFilled } from "@fluentui/react-icons";

interface Props {
    className?: string;
}

export const DocumentList = ({ className }: Props) => {
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [isCalloutVisible, setIsCalloutVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

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

    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button icon={<FolderFilled fontFamily="" primaryFill={"rgb(255, 165, 0)"} />} onClick={handleButtonClick}>
                {"Document List"}
            </Button>

            {isCalloutVisible && (
                <Callout
                    role="dialog"
                    gapSpace={0}
                    className={styles.callout}
                    target="#calloutButton"
                    onDismiss={() => setIsCalloutVisible(false)}
                    setInitialFocus
                >
                    <h3 className={styles.documentlist_KnowledgeTitle}>
                        Knowledge Scope <SparkleFilled fontSize={"30px"} primaryFill={"rgb(255, 165, 0)"} />{" "}
                    </h3>
                    {isLoading && <h4 className={styles.documentlist_loading}>Loading...</h4>}
                    <div className={styles.documentlist_counter}>
                        <p>Training files = {uploadedFiles.length} </p>
                    </div>
                    {uploadedFiles.map((filename, index) => {
                        return (
                            <ul className={styles.documentlist_ul} key={index}>
                                <li>{filename}</li>
                            </ul>
                        );
                    })}
                </Callout>
            )}
        </div>
    );
};
