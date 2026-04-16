import { Link } from "react-router-dom";
import { Button } from "../components/common";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1>Page Not Found</h1>
        <p>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
          <Link to="/events">
            <Button variant="outline">Browse Events</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
