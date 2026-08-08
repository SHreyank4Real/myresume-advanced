import { certsAndAwards, profile } from "@/data/resume";
import Reveal from "./Reveal";
import styles from "./Certs.module.css";

export default function Certs() {
  return (
    <Reveal as="section" id="certs" className={`section ${styles.wrap}`}>
      <p className="section-prompt">
        <span className="user">{profile.shortName}</span>@
        <span className="host">{profile.host}</span>:~${" "}
        <span className="cmd">ls -la ~/certs/ ~/awards/</span>
      </p>
      <h2 className="section-title">Certifications &amp; Awards</h2>
      <div className={styles.grid}>
        {certsAndAwards.map((item) => (
          <article key={item.path} className={styles.item}>
            <p className={styles.path}>
              {item.path}{" "}
              <span className={item.kind === "cert" ? styles.valid : styles.award}>
                {item.badge}
              </span>
            </p>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.org}>{item.org}</p>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
