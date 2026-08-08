import { profile } from "@/data/resume";
import Reveal from "./Reveal";
import VisitCounter from "./VisitCounter";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <Reveal as="section" id="contact" className={`section ${styles.wrap}`}>
      <p className="section-prompt">
        <span className="user">{profile.shortName}</span>@
        <span className="host">{profile.host}</span>:~${" "}
        <span className="cmd">contact --now</span>
      </p>
      <h2 className="section-title">Contact</h2>
      <div className={styles.links}>
        <a href={`mailto:${profile.email}`}>✉ {profile.email}</a>
        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
          ⌥ github/{profile.github}
        </a>
        <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
          ◈ linkedin/{profile.linkedin}
        </a>
        <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>☏ {profile.phone}</a>
      </div>

      <div className={styles.wip}>
        <p className={styles.wipLabel}>
          {"// env: portfolio — status: PENDING"}
        </p>
        <p>
          Case studies, architecture deep-dives, and project docs coming soon.
        </p>
      </div>

      <footer className={styles.footer}>
        <p>
          {profile.shortName}@{profile.host}:~$ <span className="cursor-blink" />
        </p>
        <VisitCounter />
        <p className={styles.copy}>
          © {new Date().getFullYear()} {profile.name} — All systems healthy
        </p>
      </footer>
    </Reveal>
  );
}
