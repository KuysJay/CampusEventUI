import { useEvents } from "../../context";
import { Card, CardBody } from "../../components/common";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const { events } = useEvents();

  const stats = [
    {
      label: "Total Events",
      value: events.length,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      color: "primary",
    },
    {
      label: "Active Events",
      value: events.filter((e) => e.status === "upcoming").length,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      color: "success",
    },
    {
      label: "Completed Events",
      value: events.filter((e) => e.status === "completed").length,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: "secondary",
    },
    {
      label: "Total Registrations",
      value: events.reduce((acc, e) => acc + (e.registered_count || 0), 0),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: "warning",
    },
  ];

  const recentEvents = events.slice(0, 5);

  return (
    <div className={styles.page}>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Card key={index} className={styles.statCard}>
            <CardBody className={styles.statBody}>
              <div className={`${styles.statIcon} ${styles[stat.color]}`}>{stat.icon}</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <div className={styles.cardHeader}>
          <h3>Recent Events</h3>
        </div>
        <div className={styles.eventsList}>
          {recentEvents.map((event) => (
            <div key={event.id} className={styles.eventItem}>
              <img src={event.image_url} alt="" className={styles.eventImage} />
              <div className={styles.eventInfo}>
                <span className={styles.eventTitle}>{event.title}</span>
                <span className={styles.eventMeta}>
                  {new Date(event.start_date).toLocaleDateString()} • {event.location}
                </span>
              </div>
              <span className={`${styles.status} ${styles[event.status]}`}>{event.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
