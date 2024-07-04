import { AboutCard } from "./AboutCard";
import styles from "./About.module.css";

export function Component(): JSX.Element {
    return (
        <div className={styles.about_container}>
            <AboutCard />
            <div className={styles.about_allert}>
                <p className={styles.about_allert_text}>
                    <a href="https://intranet.iit.it/offices/information-and-communication-technology/computers-software/service-desk/chatict" target="_blank">
                        Privacy policy & Terms of use
                    </a>
                    &nbsp;&nbsp; <span>|</span>&nbsp;&nbsp;
                    <a href="mailto:ict_servicedesk@iit.it" target="_blank">
                        ICT Service Desk
                    </a>
                    &nbsp;&nbsp; <span>|</span>&nbsp;&nbsp;
                    <a href="https://ictsupport.iit.it/assystnet/application.jsp#services" target="_blank">
                        ICT Customer Portal
                    </a>
                </p>
            </div>
            <div className={styles.about_version}>
                current version: <span style={{ fontWeight: "600" }}>v3.0.3</span>
            </div>
        </div>
    );
}

Component.displayName = "About";
