import { useState } from "react";
import { useEvents } from "../../context";
import { Card, Badge, Button, Modal } from "../../components/common";
import styles from "./ManageEvents.module.css";

const categoryColors = {
  workshop: "primary",
  seminar: "secondary",
  social: "success",
  sports: "warning",
  cultural: "error",
};

const categories = ["workshop", "seminar", "social", "sports", "cultural"];

export default function ManageEvents() {
  const { events, addEvent, updateEvent, deleteEvent, toggleEventStatus } = useEvents();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const emptyEvent = {
    title: "",
    description: "",
    category: "workshop",
    start_date: "",
    end_date: "",
    location: "",
    capacity: 100,
    image_url: "https://picsum.photos/800/500",
    organizer: "Admin",
    tags: [],
  };

  const [newEvent, setNewEvent] = useState(emptyEvent);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateEvent = (e) => {
    e.preventDefault();
    addEvent({ ...newEvent }, 100);
    setShowCreateModal(false);
    setNewEvent(emptyEvent);
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    updateEvent(eventToEdit.id, eventToEdit);
    setShowEditModal(false);
    setEventToEdit(null);
  };

  const openEditModal = (event) => {
    setEventToEdit({ ...event });
    setShowEditModal(true);
  };

  const handleDelete = () => {
    if (eventToDelete) {
      deleteEvent(eventToDelete.id);
      setEventToDelete(null);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2>Manage Events</h2>
          <p>{events.length} events total</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>+ Create Event</Button>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      <Card>
        <div className={styles.eventsGrid}>
          {filteredEvents.length === 0 ? (
            <div className={styles.empty}>
              <p>No events found</p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventImage}>
                  <img src={event.image_url} alt={event.title} />
                  <Badge variant={categoryColors[event.category] || "default"} className={styles.categoryBadge}>
                    {event.category}
                  </Badge>
                  <div className={styles.eventActions}>
                    <button className={styles.actionBtn} onClick={() => openEditModal(event)} title="Edit">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button className={`${styles.actionBtn} ${styles.toggle}`} onClick={() => toggleEventStatus(event.id)} title={event.status === "upcoming" ? "Mark Complete" : "Mark Upcoming"}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" />
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => setEventToDelete(event)} title="Delete">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className={styles.eventContent}>
                  <h4>{event.title}</h4>
                  <p className={styles.eventDescription}>
                    {event.description?.slice(0, 80)}...
                  </p>
                  <div className={styles.eventMeta}>
                    <span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      {new Date(event.start_date).toLocaleDateString()}
                    </span>
                    <span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      {event.location}
                    </span>
                  </div>
                  <div className={styles.eventStats}>
                    <span className={styles.registrations}>
                      {event.registered_count}/{event.capacity} registered
                    </span>
                    <span className={`${styles.status} ${styles[event.status]}`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Modal isOpen={!!eventToDelete} onClose={() => setEventToDelete(null)} title="Delete Event">
        <p>Are you sure you want to delete "{eventToDelete?.title}"? This action cannot be undone.</p>
        <div className={styles.modalActions}>
          <Button variant="ghost" onClick={() => setEventToDelete(null)}>Cancel</Button>
          <Button variant="error" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New Event">
        <form onSubmit={handleCreateEvent} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Event Title</label>
            <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} rows={3} required />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Category</label>
              <select value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Capacity</label>
              <input type="number" value={newEvent.capacity} onChange={(e) => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value) })} min={1} />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Start Date</label>
              <input type="datetime-local" value={newEvent.start_date} onChange={(e) => setNewEvent({ ...newEvent, start_date: e.target.value })} required />
            </div>
            <div className={styles.formGroup}>
              <label>End Date</label>
              <input type="datetime-local" value={newEvent.end_date} onChange={(e) => setNewEvent({ ...newEvent, end_date: e.target.value })} required />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Location</label>
            <input type="text" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} required />
          </div>
          <div className={styles.formGroup}>
            <label>Image URL</label>
            <input type="url" value={newEvent.image_url} onChange={(e) => setNewEvent({ ...newEvent, image_url: e.target.value })} />
          </div>
          <div className={styles.modalActions}>
            <Button variant="ghost" type="button" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            <Button type="submit">Create Event</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Event">
        {eventToEdit && (
          <form onSubmit={handleEditEvent} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Event Title</label>
              <input type="text" value={eventToEdit.title} onChange={(e) => setEventToEdit({ ...eventToEdit, title: e.target.value })} required />
            </div>
            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea value={eventToEdit.description} onChange={(e) => setEventToEdit({ ...eventToEdit, description: e.target.value })} rows={3} required />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Category</label>
                <select value={eventToEdit.category} onChange={(e) => setEventToEdit({ ...eventToEdit, category: e.target.value })}>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Capacity</label>
                <input type="number" value={eventToEdit.capacity} onChange={(e) => setEventToEdit({ ...eventToEdit, capacity: parseInt(e.target.value) })} min={1} />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Start Date</label>
                <input type="datetime-local" value={eventToEdit.start_date} onChange={(e) => setEventToEdit({ ...eventToEdit, start_date: e.target.value })} required />
              </div>
              <div className={styles.formGroup}>
                <label>End Date</label>
                <input type="datetime-local" value={eventToEdit.end_date} onChange={(e) => setEventToEdit({ ...eventToEdit, end_date: e.target.value })} required />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Location</label>
              <input type="text" value={eventToEdit.location} onChange={(e) => setEventToEdit({ ...eventToEdit, location: e.target.value })} required />
            </div>
            <div className={styles.formGroup}>
              <label>Image URL</label>
              <input type="url" value={eventToEdit.image_url} onChange={(e) => setEventToEdit({ ...eventToEdit, image_url: e.target.value })} />
            </div>
            <div className={styles.modalActions}>
              <Button variant="ghost" type="button" onClick={() => setShowEditModal(false)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
