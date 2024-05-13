import { FolderFilled } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";

import styles from "./DocumentList.module.css";

interface Props {
    className?: string;
    onClick: () => void;
}

export const DocumentList = ({ className, onClick }: Props) => {
    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button icon={<FolderFilled fontFamily="" primaryFill={"rgb(255, 165, 0)"} />} onClick={onClick}>
                {"Document List"}
            </Button>
        </div>
    );
};
