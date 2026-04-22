import { useMemo } from "react";
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

  const upcomingEvents = useMemo(() => events.filter((e) => e.status === "upcoming"), [events]);

  const { totalRegistrations, maxCapacity, capacityPercentage } = useMemo(() => {
    const total = upcomingEvents.reduce((sum, e) => sum + (e.registered_count || 0), 0);
    const max = upcomingEvents.reduce((sum, e) => sum + (e.capacity || 0), 0);
    const percent = max > 0 ? Math.round((total / max) * 100) : 0;
    return { totalRegistrations: total, maxCapacity: max, capacityPercentage: percent };
  }, [upcomingEvents]);

  const recentEvents = useMemo(() => 
    [...events]
      .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
      .slice(0, 5)
  , [events]);

  const popularEvents = useMemo(() => 
    [...events]
      .sort((a, b) => (b.registered_count || 0) - (a.registered_count || 0))
      .slice(0, 3)
  , [events]);

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
                    style={{ width: `${capacityPercentage}%` }}
                  />
                </div>
                <span className={styles.capacityPercent}>
                  {capacityPercentage}% filled
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
