import { AboutCard } from "./AboutCard";
import styles from "./About.module.css";
import { makeStyles, Text } from "@fluentui/react-components";

export function Component(): JSX.Element {
    return (
        <div>
            <div className={styles.about_container}>
                <AboutCard />
                {/*        
            <div className={styles.about_version}>
                current version: <span style={{ fontWeight: "600" }}>v3.0.3</span>
            </div> */}
            </div>
            <div className={styles.about_footer}>
                <p className={styles.about_footer_text}>
                    <a href="https://intranet.iit.it/offices/information-and-communication-technology/computers-software/service-desk/chatict" target="_blank">
                        Privacy policy & Terms of use
                    </a>
                    &nbsp;&nbsp; <span>|</span>&nbsp;&nbsp;
                    <a href="https://ictsupport.iit.it/assystnet/application.jsp#services" target="_blank">
                        ICT Service Desk
                    </a>
                </p>
            </div>
        </div>
    );
}

Component.displayName = "About";
