"use client";

import { navLinks, profile } from "@/data/resume";
import styles from "./NavBar.module.css";

type NavBarProps = {
  visible: boolean;
};

export default function NavBar({ visible }: NavBarProps) {
  return (
    <header className={`${styles.nav} ${visible ? styles.visible : ""}`}>
      <div className={styles.prompt}>
        <span className={styles.user}>{profile.shortName}</span>
        <span className={styles.at}>@</span>
        <span className={styles.host}>{profile.host}</span>
        <span className={styles.dollar}>:~$ </span>
        <span className="cursor-blink" aria-hidden />
      </div>
      <nav className={styles.links} aria-label="Primary">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
