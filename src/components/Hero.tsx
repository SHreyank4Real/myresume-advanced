"use client";

import { asciiName, profile } from "@/data/resume";
import styles from "./Hero.module.css";

type HeroProps = {
  onOpenTerminal: () => void;
};

export default function Hero({ onOpenTerminal }: HeroProps) {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.copy}>
        <p className={styles.prompt}>
          <span className={styles.dim}>$</span> cat /etc/profile.d/shreyank.conf
        </p>
        <pre className={`${styles.ascii} glow`} aria-label={profile.name}>
          {asciiName}
        </pre>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.role}>
          {profile.role}{" "}
          <span className={styles.badge}>{profile.credential}</span>
        </p>
        <p className={styles.tagline}>{profile.tagline}</p>
        <div className={styles.meta}>
          <span>
            <span className={styles.key}>exp</span> {profile.experienceYears}
          </span>
          <span>
            <span className={styles.key}>loc</span> {profile.location}
          </span>
        </div>
        <div className={styles.ctas}>
          <a className={styles.primary} href={`mailto:${profile.email}`}>
            $ contact --now
          </a>
          <button type="button" className={styles.secondary} onClick={onOpenTerminal}>
            $ open ./terminal
          </button>
        </div>
      </div>
      <aside className={styles.panel} aria-label="Session info">
        <div className={styles.panelHeader}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.panelTitle}>session · resume</span>
        </div>
        <div className={styles.panelBody}>
          <p>
            <span className={styles.cyan}>user</span> {profile.shortName}
          </p>
          <p>
            <span className={styles.cyan}>role</span> senior devops
          </p>
          <p>
            <span className={styles.cyan}>stack</span> k8s · gitops · kargo
          </p>
          <p>
            <span className={styles.cyan}>status</span>{" "}
            <span className={styles.ok}>ready</span>
          </p>
          <p className={styles.hint}>
            tip: scroll sections or type commands in the terminal below
          </p>
        </div>
      </aside>
    </section>
  );
}
