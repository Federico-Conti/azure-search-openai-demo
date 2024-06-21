import { AboutCard } from "./AboutCard";
import styles from "./About.module.css";

export function Component(): JSX.Element {
    return (
        <div className={styles.about_container}>
            <AboutCard />
        </div>
    );
}

Component.displayName = "About";
