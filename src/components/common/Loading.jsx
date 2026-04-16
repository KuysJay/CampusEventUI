import styles from "./Loading.module.css";

export default function Loading({ size = "medium", fullPage = false, text = "Loading..." }) {
  if (fullPage) {
    return (
      <div className={styles.fullPage}>
        <div className={`${styles.spinner} ${styles[size]}`} />
        {text && <p className={styles.text}>{text}</p>}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`} />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
