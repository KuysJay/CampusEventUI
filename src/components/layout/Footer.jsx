import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="var(--primary)" />
              <path
                d="M8 12h16M8 16h12M8 20h8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>CampusEvents</span>
          </Link>
          <p className={styles.tagline}>
            Your one-stop platform for campus events and activities.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.column}>
            <h4>Platform</h4>
            <Link to="/events">Browse Events</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/login">Login</Link>
          </div>
          <div className={styles.column}>
            <h4>Categories</h4>
            <Link to="/events?category=workshop">Workshops</Link>
            <Link to="/events?category=seminar">Seminars</Link>
            <Link to="/events?category=social">Social</Link>
          </div>
          <div className={styles.column}>
            <h4>Support</h4>
            <Link to="/help">Help Center</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} CampusEvents. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
