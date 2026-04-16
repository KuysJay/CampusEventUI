import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Badge } from "../components/common";
import { useAuth, useEvents } from "../context";
import styles from "./Dashboard.module.css";

const categoryColors = {
  workshop: "primary",
  seminar: "secondary",
  social: "success",
  sports: "warning",
  cultural: "error",
};

export default function Dashboard() {
  const { user } = useAuth();
  const { events } = useEvents();

  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const completedEvents = events.filter((e) => e.status === "completed");
  const totalRegistrations = upcomingEvents.reduce((sum, e) => sum + e.registered_count, 0);
  const maxCapacity = upcomingEvents.reduce((sum, e) => sum + e.capacity, 0);

  const stats = [
    { label: "Total Events", value: events.length, icon: "calendar" },
    { label: "Upcoming Events", value: upcomingEvents.length, icon: "clock" },
    { label: "Completed Events", value: completedEvents.length, icon: "check" },
    { label: "Total Registrations", value: totalRegistrations, icon: "users" },
  ];

  const recentEvents = [...events]
    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    .slice(0, 5);

  const popularEvents = [...events]
    .sort((a, b) => b.registered_count - a.registered_count)
    .slice(0, 3);

  const getCategoryVariant = (category) => categoryColors[category] || "default";
  const formatCategory = (cat) => cat.charAt(0).toUpperCase() + cat.slice(1);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name?.split(" ")[0] || "User"}! Here's your event overview.</p>
        </div>
        <div className={styles.headerActions}>
          <Link to="/events/create">
            <Button>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Create Event
            </Button>
          </Link>
        </div>
      </header>

      <section className={styles.statsGrid}>
        {stats.map(({ label, value, icon }) => (
          <Card key={label} className={styles.statCard}>
            <CardBody>
              <div className={styles.statIcon}>
                {icon === "calendar" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
                {icon === "clock" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
                {icon === "check" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {icon === "users" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </section>

      <div className={styles.mainGrid}>
        <section className={styles.section}>
          <Card>
            <CardHeader>
              <div className={styles.sectionHeader}>
                <h2>Recent Events</h2>
                <Link to="/events" className={styles.viewAll}>
                  View All
                </Link>
              </div>
            </CardHeader>
            <CardBody className={styles.noPadding}>
              <div className={styles.eventList}>
                {recentEvents.map((event) => (
                  <Link key={event.id} to={`/events/${event.id}`} className={styles.eventItem}>
                    <div className={styles.eventImage} style={{ backgroundImage: `url(${event.image_url})` }} />
                    <div className={styles.eventContent}>
                      <div className={styles.eventDetails}>
                        <h3 className={styles.eventTitle}>{event.title}</h3>
                        <div className={styles.eventMeta}>
                          <span>{new Date(event.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Badge variant={getCategoryVariant(event.category)} size="small">
                        {formatCategory(event.category)}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div className={styles.sectionHeader}>
                <h2>Capacity Overview</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className={styles.capacityOverview}>
                <div className={styles.capacityStats}>
                  <div className={styles.capacityStat}>
                    <span className={styles.capacityValue}>{totalRegistrations}</span>
                    <span className={styles.capacityLabel}>Total Registered</span>
                  </div>
                  <div className={styles.capacityDivider}>/</div>
                  <div className={styles.capacityStat}>
                    <span className={styles.capacityValue}>{maxCapacity}</span>
                    <span className={styles.capacityLabel}>Total Capacity</span>
                  </div>
                </div>
                <div className={styles.capacityProgress}>
                  <div
                    className={styles.capacityFill}
                    style={{ width: `${(totalRegistrations / maxCapacity) * 100}%` }}
                  />
                </div>
                <span className={styles.capacityPercent}>
                  {Math.round((totalRegistrations / maxCapacity) * 100)}% filled
                </span>
              </div>
            </CardBody>
          </Card>
        </section>

        <aside className={styles.sidebar}>
          <Card>
            <CardHeader>
              <div className={styles.sectionHeader}>
                <h2>Popular Events</h2>
              </div>
            </CardHeader>
            <CardBody className={styles.noPadding}>
              <div className={styles.popularList}>
                {popularEvents.map((event, index) => (
                  <Link key={event.id} to={`/events/${event.id}`} className={styles.popularItem}>
                    <span className={styles.popularRank}>#{index + 1}</span>
                    <div className={styles.popularInfo}>
                      <span className={styles.popularTitle}>{event.title}</span>
                      <span className={styles.popularRegistrations}>
                        {event.registered_count}/{event.capacity} registered
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div className={styles.sectionHeader}>
                <h2>Quick Actions</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className={styles.quickActions}>
                <Link to="/events/create" className={styles.quickAction}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>Create Event</span>
                </Link>
                <Link to="/events" className={styles.quickAction}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>Browse Events</span>
                </Link>
                <Link to="/profile" className={styles.quickAction}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>My Profile</span>
                </Link>
              </div>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}
