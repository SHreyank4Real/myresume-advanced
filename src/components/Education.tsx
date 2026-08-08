import { education, profile } from "@/data/resume";
import Reveal from "./Reveal";
import styles from "./Education.module.css";

export default function Education() {
  return (
    <Reveal as="section" id="edu" className={`section ${styles.wrap}`}>
      <p className="section-prompt">
        <span className="user">{profile.shortName}</span>@
        <span className="host">{profile.host}</span>:~${" "}
        <span className="cmd">grep -r &quot;degree&quot; ~/education/</span>
      </p>
      <h2 className="section-title">Education</h2>
      <div className={styles.list}>
        {education.map((edu) => (
          <article key={edu.degree} className={styles.item}>
            <h3 className={styles.degree}>{edu.degree}</h3>
            <p className={styles.school}>{edu.school}</p>
            <p className={styles.meta}>
              {edu.date} · {edu.location}
            </p>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
