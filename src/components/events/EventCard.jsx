import { Link } from "react-router-dom";
import { Badge } from "../common";
import styles from "./EventCard.module.css";

const categoryColors = {
  workshop: "primary",
  seminar: "secondary",
  social: "success",
  sports: "warning",
  cultural: "error",
};

export default function EventCard({ event, variant = "default" }) {
  const {
    id,
    title,
    description,
    category,
    start_date,
    end_date,
    location,
    capacity,
    registered_count = 0,
    status,
    image_url,
    tags = [],
    organizer,
  } = event;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const spotsLeft = capacity - registered_count;
  const capacityPercent = capacity > 0 ? (registered_count / capacity) * 100 : 0;

  return (
    <Link to={`/events/${id}`} className={`${styles.card} ${styles[variant]}`}>
      {image_url && (
        <div className={styles.imageWrapper}>
          <img src={image_url} alt={title} className={styles.image} />
          <div className={styles.imageOverlay}>
            <Badge variant={categoryColors[category] || "default"}>
              {category}
            </Badge>
            {status && (
              <Badge variant={status === "upcoming" ? "success" : "default"}>
                {status}
              </Badge>
            )}
          </div>
          {capacityPercent >= 90 && (
            <div className={styles.almostFull}>Almost Full</div>
          )}
        </div>
      )}

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {organizer && (
          <p className={styles.organizer}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {organizer}
          </p>
        )}

        {description && (
          <p className={styles.description}>
            {description.length > 120 ? description.slice(0, 120) + "..." : description}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tag}>#{tag}</span>
            ))}
          </div>
        )}

        <div className={styles.divider} />

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
              <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>{formatDate(start_date)}</span>
          </div>

          <div className={styles.metaItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>{formatTime(start_date)}</span>
          </div>

          <div className={styles.metaItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>{location}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.capacity}>
            <div className={styles.capacityBar}>
              <div
                className={styles.capacityFill}
                style={{
                  width: `${Math.min(capacityPercent, 100)}%`,
                  backgroundColor: capacityPercent >= 90 ? "var(--error)" : capacityPercent >= 70 ? "var(--warning)" : "var(--success)"
                }}
              />
            </div>
            <span className={styles.capacityText}>
              {registered_count}/{capacity} registered
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
