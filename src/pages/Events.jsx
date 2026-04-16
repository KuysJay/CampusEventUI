import { useState, useMemo, useEffect } from "react";
import { EventFilters, EventList } from "../components/events";
import { useEvents } from "../context";
import styles from "./Events.module.css";

export default function Events() {
  const { events } = useEvents();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date");
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showUpdateMsg, setShowUpdateMsg] = useState(false);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const newData = data.slice(0, 12);
        if (apiData.length > 0 && JSON.stringify(newData) !== JSON.stringify(apiData)) {
          setShowUpdateMsg(true);
          setTimeout(() => setShowUpdateMsg(false), 2000);
        }
        setApiData(newData);
        setLastUpdated(new Date());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
    const interval = setInterval(fetchApiData, 5000);
    return () => clearInterval(interval);
  }, []);

  const combinedEvents = useMemo(() => {
    const apiEvents = apiData.map((post, index) => ({
      id: 1000 + post.id,
      title: post.title,
      description: post.body,
      category: ["seminar", "workshop", "cultural", "sports", "social"][index % 5],
      start_date: new Date(Date.now() + index * 86400000 * 3).toISOString(),
      end_date: new Date(Date.now() + index * 86400000 * 3 + 7200000).toISOString(),
      location: "Campus Auditorium",
      capacity: 100,
      registered_count: Math.floor(Math.random() * 80) + 20,
      status: "upcoming",
      image_url: `https://picsum.photos/seed/${post.id}/800/500`,
      organizer: "Event Team",
      tags: ["featured"],
      createdBy: 1,
    }));
    return [...events, ...apiEvents];
  }, [events, apiData]);

  const filteredEvents = useMemo(() => {
    let result = [...combinedEvents];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(searchLower) ||
          e.description.toLowerCase().includes(searchLower)
      );
    }

    if (category) {
      result = result.filter((e) => e.category === category);
    }

    result.sort((a, b) => {
      switch (sort) {
        case "date":
          return new Date(a.start_date) - new Date(b.start_date);
        case "-date":
          return new Date(b.start_date) - new Date(a.start_date);
        case "title":
          return a.title.localeCompare(b.title);
        case "-title":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [combinedEvents, search, category, sort]);

  const handleClear = () => {
    setSearch("");
    setCategory("");
    setSort("date");
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>Browse Events</h1>
          <p>Discover events happening on campus</p>
        </header>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>Browse Events</h1>
          <p>Discover events happening on campus</p>
        </header>
        <div className={styles.error}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryBtn}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Browse Events</h1>
        <p>Discover events happening on campus</p>
      </header>

      <EventFilters
        search={search}
        category={category}
        sort={sort}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onSortChange={setSort}
        onClear={handleClear}
      />

      {lastUpdated && (
        <div className={styles.lastUpdated}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}

      {showUpdateMsg && (
        <div className={styles.updateToast}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Data Updated
        </div>
      )}

      <EventList
        events={filteredEvents}
        emptyMessage="No events match your filters"
      />
    </div>
  );
}
