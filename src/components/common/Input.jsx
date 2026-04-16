import { forwardRef, useId } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(function Input(
  {
    label,
    error,
    helper,
    fullWidth = true,
    className = "",
    type = "text",
    id,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ""} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        className={`${styles.input} ${error ? styles.error : ""}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
      {helper && !error && <span className={styles.helper}>{helper}</span>}
    </div>
  );
});

export default Input;

export const Textarea = forwardRef(function Textarea(
  { label, error, helper, fullWidth = true, children, className = "", id, ...props },
  ref
) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ""} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={`${styles.textarea} ${error ? styles.error : ""}`}
        {...props}
      >
        {children}
      </textarea>
      {error && <span className={styles.errorText}>{error}</span>}
      {helper && !error && <span className={styles.helper}>{helper}</span>}
    </div>
  );
});

export const Select = forwardRef(function Select(
  { label, error, helper, fullWidth = true, children, className = "", id, ...props },
  ref
) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ""} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={inputId}
        className={`${styles.select} ${error ? styles.error : ""}`}
        {...props}
      >
        {children}
      </select>
      {error && <span className={styles.errorText}>{error}</span>}
      {helper && !error && <span className={styles.helper}>{helper}</span>}
    </div>
  );
});
