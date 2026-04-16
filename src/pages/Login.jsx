import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../components/common";
import { useAuth } from "../context";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setLoginError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await login(formData.email, formData.password);
    if (result.success) {
      if (result.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setLoginError(result.error || "Invalid email or password");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.decorativePanel}>
          <div className={styles.decorativeContent}>
            <div className={styles.logo}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="rgba(255,255,255,0.2)" />
                <path d="M14 18h20M14 24h20M14 30h12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="36" cy="30" r="4" fill="#fbbf24" />
              </svg>
            </div>
            <h2 className={styles.brandTitle}>CampusEvents</h2>
            <p className={styles.brandDescription}>
              Your gateway to campus life. Discover events, connect with peers, and make the most of your university experience.
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Discover 150+ events</span>
              </div>
              <div className={styles.feature}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Connect with 5,000+ students</span>
              </div>
              <div className={styles.feature}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>30+ organizations</span>
              </div>
            </div>
          </div>
          <div className={styles.decorativeShape1} />
          <div className={styles.decorativeShape2} />
        </div>

        <div className={styles.formPanel}>
          <div className={styles.formContainer}>
            <div className={styles.header}>
              <h1>Welcome back</h1>
              <p>Sign in to continue to CampusEvents</p>
            </div>

            {loginError && (
              <div className={styles.errorAlert}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {loginError}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@university.edu"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? styles.inputError : ""}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="password">Password</label>
                  <Link to="/forgot-password" className={styles.forgotLink}>
                    Forgot password?
                  </Link>
                </div>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? styles.inputError : ""}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <span className={styles.errorText}>{errors.password}</span>}
              </div>

              <Button type="submit" fullWidth loading={isLoading}>
                Sign In
              </Button>
            </form>

            <div className={styles.demoSection}>
              <p className={styles.demoTitle}>Quick Demo Access</p>
              <div className={styles.demoAccounts}>
                <button
                  type="button"
                  className={styles.demoBtn}
                  onClick={() => {
                    setFormData({ email: "alex@university.edu", password: "demo123" });
                    setErrors({});
                    setLoginError("");
                  }}
                >
                  <div className={styles.demoIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className={styles.demoInfo}>
                    <span className={styles.demoRole}>Student Account</span>
                    <span className={styles.demoEmail}>alex@university.edu</span>
                  </div>
                </button>
                <button
                  type="button"
                  className={`${styles.demoBtn} ${styles.demoBtnAdmin}`}
                  onClick={() => {
                    setFormData({ email: "admin@campus.edu", password: "admin123" });
                    setErrors({});
                    setLoginError("");
                  }}
                >
                  <div className={styles.demoIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 15l-2 5-2-2-2 2-2-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 15V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className={styles.demoInfo}>
                    <span className={styles.demoRole}>Admin Account</span>
                    <span className={styles.demoEmail}>admin@campus.edu</span>
                  </div>
                </button>
              </div>
            </div>

            <div className={styles.footer}>
              <p>
                Don't have an account?{" "}
                <Link to="/register" className={styles.registerLink}>
                  Create one
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
