import styles from "./Ticker.module.css";

const ITEMS = [
  "SITE RELIABILITY",
  "KUBERNETES",
  "AWS",
  "OBSERVABILITY",
  "IaC",
  "GITOPS",
  "INCIDENT RESPONSE",
  "CKA",
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className={styles.wrap} aria-hidden>
      <span className={styles.label}>LIVE</span>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className={styles.item}>
            {item} <span className={styles.sep}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
