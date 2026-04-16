import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Textarea, Select, Button } from "../components/common";
import { useAuth, useEvents } from "../context";
import styles from "./CreateEvent.module.css";

const categories = [
  { value: "workshop", label: "Workshop" },
  { value: "seminar", label: "Seminar" },
  { value: "social", label: "Social" },
  { value: "sports", label: "Sports" },
  { value: "cultural", label: "Cultural" },
];

const categoryImages = {
  workshop: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=500&fit=crop",
  seminar: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
  social: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=500&fit=crop",
  sports: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop",
  cultural: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop",
};

export default function CreateEvent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addEvent } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "workshop",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    location: "",
    capacity: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.start_date) {
      newErrors.start_date = "Start date is required";
    }

    if (!formData.start_time) {
      newErrors.start_time = "Start time is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.capacity) {
      newErrors.capacity = "Capacity is required";
    } else if (parseInt(formData.capacity) < 1) {
      newErrors.capacity = "Capacity must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const startDateTime = `${formData.start_date}T${formData.start_time}:00`;
    const endDateTime = formData.end_date && formData.end_time
      ? `${formData.end_date}T${formData.end_time}:00`
      : `${formData.start_date}T${formData.start_time}:00`;

    const newEvent = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      start_date: startDateTime,
      end_date: endDateTime,
      location: formData.location,
      capacity: parseInt(formData.capacity),
      image_url: categoryImages[formData.category],
      organizer: user?.name || "Unknown",
      tags: [formData.category],
    };

    await new Promise((resolve) => setTimeout(resolve, 500));
    addEvent(newEvent, user?.id);
    setIsSubmitting(false);
    navigate("/dashboard");
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Create New Event</h1>
        <p>Fill in the details to create your event</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2>Basic Information</h2>
          <div className={styles.grid}>
            <Input
              label="Event Title"
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
            />

            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          <Textarea
            label="Description"
            name="description"
            placeholder="Describe your event..."
            rows={5}
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
          />
        </div>

        <div className={styles.section}>
          <h2>Date & Time</h2>
          <div className={styles.grid}>
            <Input
              label="Start Date"
              name="start_date"
              type="date"
              value={formData.start_date}
              onChange={handleChange}
              error={errors.start_date}
            />
            <Input
              label="Start Time"
              name="start_time"
              type="time"
              value={formData.start_time}
              onChange={handleChange}
              error={errors.start_time}
            />
            <Input
              label="End Date (Optional)"
              name="end_date"
              type="date"
              value={formData.end_date}
              onChange={handleChange}
            />
            <Input
              label="End Time (Optional)"
              name="end_time"
              type="time"
              value={formData.end_time}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2>Location & Capacity</h2>
          <div className={styles.grid}>
            <Input
              label="Location"
              name="location"
              placeholder="e.g., Main Auditorium"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
            />
            <Input
              label="Capacity"
              name="capacity"
              type="number"
              min="1"
              placeholder="Maximum attendees"
              value={formData.capacity}
              onChange={handleChange}
              error={errors.capacity}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="ghost" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Create Event
          </Button>
        </div>
      </form>
    </div>
  );
}
