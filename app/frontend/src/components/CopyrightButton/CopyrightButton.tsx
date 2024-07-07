import { CodeBlockRegular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";

import styles from "./CopyrightButton.module.css";

interface Props {
    className?: string;
    onClick: () => void;
    disabled?: boolean;
}

export const CopyrightButton = ({ className, disabled, onClick }: Props) => {
    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button icon={<CodeBlockRegular fontFamily="" primaryFill={"rgba(0, 114, 175)"} fontSize={"23px"} />} disabled={disabled} onClick={onClick}>
                <i>{"by ICT Directorate"}</i>
            </Button>
        </div>
    );
};
