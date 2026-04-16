import EventCard from "./EventCard";
import styles from "./EventList.module.css";

export default function EventList({ events, variant = "default", emptyMessage = "No events found" }) {
  if (!events || events.length === 0) {
    return (
      <div className={styles.empty}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="6" y="10" width="36" height="32" rx="4" stroke="var(--border)" strokeWidth="2" />
          <path d="M6 18h36M16 6v8M32 6v8" stroke="var(--border)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${styles[variant]}`}>
      {events.map((event, index) => (
        <EventCard
          key={event.id}
          event={event}
          variant={variant}
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </div>
  );
}
