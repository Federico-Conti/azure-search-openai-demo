import { AboutCard } from "./AboutCard";
import styles from "./About.module.css";

export function Component(): JSX.Element {
    return (
        <div className={styles.about_container}>
            <AboutCard />
            <div className={styles.about_allert}>
                <p className={styles.about_allert_text}>
                    <i>
                        All services provided, including OpenAi models, are exclusively hosted in the Microsoft cloud Azure of the IIT Foundation and managed by
                        the ICT Application Management office. <br /> This ensures that the data will not be used by third parties for fine-tuning the models.
                        <br />
                        Please do not enter any personal data.
                    </i>
                </p>
            </div>
        </div>
    );
}

Component.displayName = "About";
