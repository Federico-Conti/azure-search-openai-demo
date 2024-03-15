import styles from "./ask/Ask.module.css";

export function Component(): JSX.Element {
    return <h2 className={styles.chatEmptyStateSubtitle}>We are working to bring you a Ai chat, Stay tuned!</h2>;
}

Component.displayName = "FutureSteps";
