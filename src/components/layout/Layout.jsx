import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context";
import styles from "./Layout.module.css";

export default function Layout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.layout}>
      {isAuthenticated && <Navbar />}
      <main className={`${styles.main} ${!isAuthenticated ? styles.fullHeight : ""}`}>
        <Outlet />
      </main>
      {isAuthenticated && <Footer />}
    </div>
  );
}
