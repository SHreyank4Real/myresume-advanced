import { profile, skills } from "@/data/resume";
import Reveal from "./Reveal";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <Reveal as="section" id="skills" className={`section ${styles.wrap}`}>
      <p className="section-prompt">
        <span className="user">{profile.shortName}</span>@
        <span className="host">{profile.host}</span>:~${" "}
        <span className="cmd">cat skills.json | jq &apos;.[]&apos;</span>
      </p>
      <h2 className="section-title">Skills &amp; Stack</h2>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>NAME</th>
              <th>TOOLS / COMPONENTS</th>
              <th>EXP</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.name}>
                <td>{skill.name}</td>
                <td>{skill.tools.join("  ")}</td>
                <td>{skill.years}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.mobile}>
        {skills.map((skill) => (
          <div key={skill.name} className={styles.mobRow}>
            <div className={styles.mobHead}>
              <span className={styles.mobName}>{skill.name}</span>
              <span className={styles.mobYears}>{skill.years}</span>
            </div>
            <div className={styles.tags}>
              {skill.tools.map((t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
