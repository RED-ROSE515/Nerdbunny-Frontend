import styles from '@/styles/marquee.module.css';

export default function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.marquee}>
      <div className={styles.marqueeContent}>{children}</div>
    </div>
  );
}
