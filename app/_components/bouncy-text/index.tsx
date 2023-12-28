import styles from "./style.module.scss";

export default function BouncyText({
  text,
  fontFamily = "primary-font",
  fontSize = "header-size",
  bounceDuration = "1s",
}: {
  text: string;
  fontFamily?: string;
  fontSize?: string;
  bounceDuration?: string;
}) {
  return (
    <div
      className={styles['text-wrapper']}
      style={{
        "--bounce-duration": bounceDuration,
        "--font-size": `var(--${fontSize})`,
        "--font-family": `var(--${fontFamily})`,
      } as React.CSSProperties}
    >
      {text.split("").map((char, index) => (
        <span key={index} className={char === ' ' ? styles.space : ''}>{char}</span>
      ))}
    </div>
  );
}
