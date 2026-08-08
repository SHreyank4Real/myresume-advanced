import { experience, profile } from "@/data/resume";
import Reveal from "./Reveal";
import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <Reveal as="section" id="experience" className={`section ${styles.wrap}`}>
      <p className="section-prompt">
        <span className="user">{profile.shortName}</span>@
        <span className="host">{profile.host}</span>:~${" "}
        <span className="cmd">cat experience.log | sort -r</span>
      </p>
      <h2 className="section-title">Experience</h2>
      <div className={styles.list}>
        {experience.map((job) => (
          <article key={job.id} className={styles.card}>
            <div className={styles.head}>
              <div>
                <p className={styles.period}>
                  {job.period}
                  {job.active ? (
                    <span className={styles.active}>● ACTIVE</span>
                  ) : null}
                </p>
                <h3 className={styles.title}>{job.title}</h3>
                <p className={styles.company}>
                  {job.company} · {job.location}
                </p>
              </div>
            </div>
            <ul className={styles.bullets}>
              {job.bullets.map((b) => (
                <li key={b.tag + b.text}>
                  <span className={styles.tag}>[{b.tag}]</span> {b.text}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
