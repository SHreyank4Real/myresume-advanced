"use client";

import { useEffect, useState } from "react";
import styles from "./BootScreen.module.css";

const LINES = [
  { text: "BIOS check .............................", cls: "ok" },
  { text: "Loading kernel modules .................", cls: "ok" },
  { text: "Mounting /resume .......................", cls: "ok" },
  { text: "Initializing observability stack ........", cls: "ok" },
  { text: "Connecting to visit counter (redis) .....", cls: "dim" },
  { text: "Starting shreyank@prod-01 session .......", cls: "bright" },
];

type BootScreenProps = {
  onDone: () => void;
};

export default function BootScreen({ onDone }: BootScreenProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [fading, setFading] = useState(false);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 280);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (visibleCount < LINES.length) {
      const t = setTimeout(() => setVisibleCount((c) => c + 1), 180);
      return () => clearTimeout(t);
    }

    const fade = setTimeout(() => setFading(true), 420);
    const done = setTimeout(onDone, 900);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, [visibleCount, onDone]);

  return (
    <div
      className={`${styles.boot} ${fading ? styles.fadeOut : ""}`}
      aria-hidden={fading}
    >
      <p className={styles.header}>
        shreyank@terminal:~$ boot --resume<span className={styles.dots}>{dots}</span>
      </p>
      {LINES.map((line, i) => (
        <p
          key={line.text}
          className={`${styles.line} ${styles[line.cls]} ${
            i < visibleCount ? styles.show : ""
          }`}
        >
          {line.text}
          {line.cls === "ok" && i < visibleCount ? (
            <span className={styles.okTag}> [ OK ]</span>
          ) : null}
        </p>
      ))}
    </div>
  );
}
