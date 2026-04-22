import { Link } from "react-router-dom";
import { Button } from "../components/common";
import { EventList } from "../components/events";
import { useEvents } from "../context";
import styles from "./Home.module.css";

export default function Home() {
  const { events } = useEvents();
  const featuredEvents = events.filter((e) => e.status === "upcoming").slice(0, 3);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBackground} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover Campus <span className={styles.highlight}>Events</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Find workshops, seminars, social events, and more happening on campus.
            Connect, learn, and make the most of your campus experience.
          </p>
          <div className={styles.heroActions}>
            <Link to="/events">
              <Button size="large">Browse Events</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="large">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Featured Events</h2>
          <Link to="/events" className={styles.viewAll}>
            View All Events
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <EventList events={featuredEvents} />
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaPattern} />
        <div className={styles.ctaContent}>
          <h2>Want to Organize an Event?</h2>
          <p>
            Campus organizations can create and manage their own events.
            Reach thousands of students and make an impact.
          </p>
          <Link to="/events/create">
            <button>Create Event</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
