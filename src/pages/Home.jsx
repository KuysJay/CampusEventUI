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
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <div className={styles.statIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span className={styles.statNumber}>150+</span>
              <span className={styles.statLabel}>Events This Semester</span>
            </div>
            <div className={styles.stat}>
              <div className={styles.statIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className={styles.statNumber}>5,000+</span>
              <span className={styles.statLabel}>Active Students</span>
            </div>
            <div className={styles.stat}>
              <div className={styles.statIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className={styles.statNumber}>30+</span>
              <span className={styles.statLabel}>Student Organizations</span>
            </div>
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
