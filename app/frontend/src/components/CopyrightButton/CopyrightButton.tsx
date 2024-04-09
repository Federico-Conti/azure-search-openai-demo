import { Delete24Regular } from "@fluentui/react-icons";
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
            <Button style={{ gap: "2px" }} icon={<img src="../../../public/copyright.png" alt="copyright" width={20} />} disabled={disabled} onClick={onClick}>
                {"ICT Directorate"}
            </Button>
        </div>
    );
};
