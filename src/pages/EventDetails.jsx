import { useParams, Link } from "react-router-dom";
import { Badge, Button } from "../components/common";
import { useAuth, useEvents } from "../context";
import styles from "./EventDetails.module.css";

const categoryColors = {
  workshop: "primary",
  seminar: "secondary",
  social: "success",
  sports: "warning",
  cultural: "error",
};

export default function EventDetails() {
  const { id } = useParams();
  const { user, registerForEvent, cancelRegistration } = useAuth();
  const { getEventById } = useEvents();
  const event = getEventById(id);

  if (!event) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h2>Event not found</h2>
          <Link to="/events">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isRegistered = user?.registeredEvents?.includes(event.id);
  const spotsLeft = event.capacity - event.registered_count;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
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

  const handleRegister = () => {
    if (registerForEvent && !isRegistered && spotsLeft > 0) {
      registerForEvent(event.id);
    }
  };

  const handleCancel = () => {
    if (cancelRegistration && isRegistered) {
      cancelRegistration(event.id);
    }
  };

  return (
    <div className={styles.page}>
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${event.image_url})` }}
      >
        <div className={styles.heroOverlay}>
          <Link to="/events" className={styles.backLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Events
          </Link>
          <div className={styles.heroContent}>
            <div className={styles.badges}>
              <Badge variant={categoryColors[event.category]} size="medium">
                {event.category}
              </Badge>
              <Badge variant={event.status === "upcoming" ? "success" : "default"} size="medium">
                {event.status}
              </Badge>
            </div>
            <h1 className={styles.title}>{event.title}</h1>
            <div className={styles.heroMeta}>
              <span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {formatDate(event.start_date)}
              </span>
              <span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 11s-6-4.5-6-8.5a6 6 0 0112 0c0 4-6 8.5-6 8.5z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="8" r="1.5" stroke="currentColor" strokeWidth="2" />
                </svg>
                {event.location}
              </span>
              <span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {formatTime(event.start_date)} - {formatTime(event.end_date)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <section className={styles.section}>
            <h2>About This Event</h2>
            <div className={styles.description}>
              {event.description.split("\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          {event.tags && event.tags.length > 0 && (
            <section className={styles.section}>
              <h2>Tags</h2>
              <div className={styles.tags}>
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="default" size="small">{tag}</Badge>
                ))}
              </div>
            </section>
          )}

          <section className={styles.section}>
            <h2>Organizer</h2>
            <div className={styles.organizer}>
              <div className={styles.organizerAvatar}>
                {event.organizer?.charAt(0)}
              </div>
              <div>
                <span className={styles.organizerName}>{event.organizer}</span>
              </div>
            </div>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.registerCard}>
            <div className={styles.registerStats}>
              <div className={styles.registerStat}>
                <span className={styles.registerStatValue}>{event.registered_count}</span>
                <span className={styles.registerStatLabel}>Registered</span>
              </div>
              <div className={styles.registerStat}>
                <span className={styles.registerStatValue}>{event.capacity}</span>
                <span className={styles.registerStatLabel}>Capacity</span>
              </div>
            </div>

            <div className={styles.progressWrapper}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${(event.registered_count / event.capacity) * 100}%` }}
                />
              </div>
              <span className={styles.progressText}>
                {spotsLeft > 0 ? `${spotsLeft} spots remaining` : "Event Full"}
              </span>
            </div>

            {isRegistered ? (
              <div className={styles.registerActions}>
                <div className={styles.registeredMessage}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  You're registered for this event!
                </div>
                <Button variant="outline" fullWidth onClick={handleCancel}>
                  Cancel Registration
                </Button>
              </div>
            ) : spotsLeft > 0 ? (
              <Button fullWidth size="large" onClick={handleRegister}>
                Register Now
              </Button>
            ) : (
              <Button fullWidth size="large" variant="outline" disabled>
                Join Waitlist
              </Button>
            )}
          </div>

          <div className={styles.shareCard}>
            <h3>Share This Event</h3>
            <div className={styles.shareButtons}>
              <button className={styles.shareButton}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className={styles.shareButton}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className={styles.shareButton}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
