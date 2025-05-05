import styles from '../styles/AnimatedLogoText.module.css';

export default function AnimatedLogoText() {
  return (
    <button className={styles.button} data-text="\u00A0m44.io\u00A0">
      <span className={styles.actualText}>{'\u00A0'}m44.io{'\u00A0'}</span>
      <span aria-hidden="true" className={styles.hoverText}>
        {'\u00A0'}m44.io{'\u00A0'}
      </span>
    </button>
  );
}