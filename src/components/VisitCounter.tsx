"use client";

import { useEffect, useState } from "react";
import styles from "./VisitCounter.module.css";

type Stats = {
  total: number;
  unique: number;
  configured: boolean;
};

export default function VisitCounter() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function track() {
      try {
        const visitRes = await fetch("/api/visit", { method: "POST" });
        const visitData = (await visitRes.json()) as Stats;
        if (!cancelled) setStats(visitData);

        const statsRes = await fetch("/api/stats");
        const statsData = (await statsRes.json()) as Stats;
        if (!cancelled) setStats(statsData);
      } catch {
        if (!cancelled) {
          setStats({ total: 0, unique: 0, configured: false });
        }
      }
    }

    track();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!stats) {
    return (
      <p className={styles.counter}>
        visitors@session: <span className={styles.dim}>syncing...</span>
      </p>
    );
  }

  if (!stats.configured) {
    return (
      <p className={styles.counter}>
        visitors@session: <span className={styles.warn}>counter offline</span>
      </p>
    );
  }

  return (
    <p className={styles.counter}>
      visitors@session:{" "}
      <span className={styles.num}>{stats.total}</span> pageviews ·{" "}
      <span className={styles.num}>{stats.unique}</span> unique
      <span className={styles.dot} aria-hidden>
        ●
      </span>
    </p>
  );
}
