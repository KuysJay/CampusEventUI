import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Badge } from "../components/common";
import { useAuth, useEvents } from "../context";
import styles from "./Profile.module.css";

const interestsList = [
  { value: "workshop", label: "Workshop", color: "primary" },
  { value: "seminar", label: "Seminar", color: "secondary" },
  { value: "social", label: "Social", color: "success" },
  { value: "sports", label: "Sports", color: "warning" },
  { value: "cultural", label: "Cultural", color: "error" },
];

const categoryColors = {
  workshop: "primary",
  seminar: "secondary",
  social: "success",
  sports: "warning",
  cultural: "error",
};

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { events } = useEvents();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    faculty: user?.faculty || "",
    year: user?.year || "",
  });

  const myCreatedEvents = events.filter((e) => e.createdBy === user?.id);
  const registeredEvents = events.filter((e) => user?.registeredEvents?.includes(e.id));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const toggleInterest = (interest) => {
    const currentInterests = user?.interests || [];
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter((i) => i !== interest)
      : [...currentInterests, interest];
    updateProfile({ interests: newInterests });
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {getInitials(user?.name)}
          </div>
          <div className={styles.userInfo}>
            {isEditing ? (
              <div className={styles.editForm}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={styles.editInput}
                />
                <input
                  type="text"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  placeholder="Faculty/Department"
                  className={styles.editInput}
                />
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Year (e.g., 3rd Year)"
                  className={styles.editInput}
                />
              </div>
            ) : (
              <>
                <h1>{user?.name || "User"}</h1>
                <p className={styles.role}>{user?.role || "Student"}</p>
                <p className={styles.email}>{user?.email || ""}</p>
              </>
            )}
          </div>
        </div>
        <div className={styles.headerActions}>
          {isEditing ? (
            <>
              <Button size="small" onClick={handleSave}>Save Changes</Button>
              <Button variant="ghost" size="small" onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <Button variant="secondary" size="small" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>{user?.faculty || "Faculty"}</span>
          </div>
          <div className={styles.metaItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>{user?.year || "Year"}</span>
          </div>
          <div className={styles.metaItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Joined {user?.memberSince || "Recently"}</span>
          </div>
        </div>
      )}

      <div className={styles.grid}>
        <Card className={styles.aboutCard}>
          <CardHeader>
            <h2>About</h2>
          </CardHeader>
          <CardBody>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                className={styles.bioTextarea}
                rows={4}
              />
            ) : (
              <p className={styles.bio}>
                {user?.bio || "No bio added yet. Click 'Edit Profile' to add one."}
              </p>
            )}
          </CardBody>
        </Card>

        <Card className={styles.interestsCard}>
          <CardHeader>
            <h2>My Interests</h2>
          </CardHeader>
          <CardBody>
            <p className={styles.hint}>Select interests to get personalized recommendations</p>
            <div className={styles.interestsList}>
              {interestsList.map(({ value, label, color }) => {
                const isSelected = user?.interests?.includes(value);
                return (
                  <button
                    key={value}
                    className={`${styles.interestBtn} ${isSelected ? styles.selected : ""}`}
                    onClick={() => toggleInterest(value)}
                  >
                    <span className={`${styles.dot} ${styles[color]}`} />
                    {label}
                    {isSelected && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.checkIcon}>
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className={styles.statsRow}>
        <Card className={styles.statCard}>
          <CardBody>
            <div className={styles.statIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{myCreatedEvents.length}</span>
              <span className={styles.statLabel}>Events Created</span>
            </div>
          </CardBody>
        </Card>
        <Card className={styles.statCard}>
          <CardBody>
            <div className={styles.statIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{registeredEvents.length}</span>
              <span className={styles.statLabel}>Registered</span>
            </div>
          </CardBody>
        </Card>
        <Card className={styles.statCard}>
          <CardBody>
            <div className={styles.statIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{user?.hoursAttended || 0}h</span>
              <span className={styles.statLabel}>Hours Attended</span>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className={styles.eventsSection}>
        <Card>
          <CardHeader>
            <div className={styles.sectionHeader}>
              <h2>My Events</h2>
              <Link to="/events/create" className={styles.addLink}>+ Create Event</Link>
            </div>
          </CardHeader>
          <CardBody className={styles.noPadding}>
            {myCreatedEvents.length > 0 || registeredEvents.length > 0 ? (
              <div className={styles.eventsList}>
                {[...myCreatedEvents, ...registeredEvents].slice(0, 6).map((event) => (
                  <Link key={event.id} to={`/events/${event.id}`} className={styles.eventItem}>
                    <div className={styles.eventImage} style={{ backgroundImage: `url(${event.image_url})` }} />
                    <div className={styles.eventDetails}>
                      <h4>{event.title}</h4>
                      <p>{new Date(event.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                      <p>{event.location}</p>
                    </div>
                    <Badge variant={categoryColors[event.category] || "default"} size="small">
                      {event.category}
                    </Badge>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>You haven't created or registered for any events yet</p>
                <Link to="/events">
                  <Button size="small">Browse Events</Button>
                </Link>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
