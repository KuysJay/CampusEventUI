import styles from "./Card.module.css";

export default function Card({
  children,
  variant = "default",
  padding = "medium",
  hoverable = false,
  className = "",
  onClick,
  ...props
}) {
  const classNames = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    hoverable && styles.hoverable,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} onClick={onClick} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`${styles.header} ${className}`}>{children}</div>;
}

export function CardBody({ children, className = "" }) {
  return <div className={`${styles.body} ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return <div className={`${styles.footer} ${className}`}>{children}</div>;
}
