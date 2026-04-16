import { createContext, useContext, useState, useEffect, useCallback } from "react";

const EventContext = createContext(null);

const initialEvents = [
  {
    id: 1,
    title: "Tech Innovation Summit 2026",
    description: "Join industry leaders to explore the future of technology and innovation. This premier event brings together visionaries, entrepreneurs, and tech enthusiasts for a day of inspiration and networking.",
    category: "seminar",
    start_date: "2026-04-25T09:00:00",
    end_date: "2026-04-25T17:00:00",
    location: "Main Auditorium, Building A",
    capacity: 200,
    registered_count: 156,
    status: "upcoming",
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    organizer: "Computer Science Society",
    tags: ["technology", "innovation", "networking"],
    createdBy: 1,
  },
  {
    id: 2,
    title: "Web Development Workshop",
    description: "Hands-on workshop covering modern web development frameworks including React, Vue, and Angular. Learn best practices and build real projects.",
    category: "workshop",
    start_date: "2026-04-28T14:00:00",
    end_date: "2026-04-28T18:00:00",
    location: "Computer Lab 3, Engineering Building",
    capacity: 50,
    registered_count: 42,
    status: "upcoming",
    image_url: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=500&fit=crop",
    organizer: "Web Development Club",
    tags: ["coding", "web", "development"],
    createdBy: 1,
  },
  {
    id: 3,
    title: "Spring Cultural Festival",
    description: "Celebrate diversity with music, food, and performances from around the world. Experience different cultures through student performances, international cuisine, and art exhibitions.",
    category: "cultural",
    start_date: "2026-05-02T14:00:00",
    end_date: "2026-05-02T22:00:00",
    location: "Campus Green & Amphitheater",
    capacity: 500,
    registered_count: 389,
    status: "upcoming",
    image_url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop",
    organizer: "International Students Association",
    tags: ["culture", "music", "food", "diversity"],
    createdBy: 2,
  },
  {
    id: 4,
    title: "Intramural Basketball Tournament",
    description: "Compete with other students in our annual basketball tournament. Show off your skills, make new friends, and represent your department!",
    category: "sports",
    start_date: "2026-05-05T10:00:00",
    end_date: "2026-05-05T18:00:00",
    location: "Sports Complex, Indoor Court A",
    capacity: 120,
    registered_count: 98,
    status: "upcoming",
    image_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop",
    organizer: "Sports Committee",
    tags: ["basketball", "sports", "tournament", "competition"],
    createdBy: 3,
  },
  {
    id: 5,
    title: "Career Networking Night",
    description: "Meet recruiters from top companies and expand your professional network. Perfect opportunity to learn about internship and job opportunities.",
    category: "social",
    start_date: "2026-05-10T18:00:00",
    end_date: "2026-05-10T21:00:00",
    location: "Student Center Ballroom",
    capacity: 300,
    registered_count: 245,
    status: "upcoming",
    image_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=500&fit=crop",
    organizer: "Career Services",
    tags: ["career", "networking", "jobs", "professional"],
    createdBy: 1,
  },
  {
    id: 6,
    title: "Data Science Workshop",
    description: "Learn the fundamentals of data science with hands-on projects using Python, pandas, and machine learning libraries. Perfect for beginners!",
    category: "workshop",
    start_date: "2026-05-12T15:00:00",
    end_date: "2026-05-12T19:00:00",
    location: "Data Lab, Science Building",
    capacity: 40,
    registered_count: 40,
    status: "upcoming",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    organizer: "Data Science Club",
    tags: ["data", "python", "machine learning", "analytics"],
    createdBy: 2,
  },
  {
    id: 7,
    title: "AI & Machine Learning Seminar",
    description: "Explore the latest trends in artificial intelligence and machine learning. Guest speakers from leading tech companies share insights.",
    category: "seminar",
    start_date: "2026-03-15T10:00:00",
    end_date: "2026-03-15T14:00:00",
    location: "Lecture Hall B",
    capacity: 150,
    registered_count: 150,
    status: "completed",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    organizer: "AI Research Group",
    tags: ["AI", "machine learning", "technology"],
    createdBy: 1,
  },
  {
    id: 8,
    title: "Photography Basics Workshop",
    description: "Learn the fundamentals of photography including composition, lighting, and camera settings. Bring your camera or smartphone!",
    category: "workshop",
    start_date: "2026-03-08T13:00:00",
    end_date: "2026-03-08T17:00:00",
    location: "Art Studio, Creative Building",
    capacity: 30,
    registered_count: 30,
    status: "completed",
    image_url: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&h=500&fit=crop",
    organizer: "Photography Club",
    tags: ["photography", "art", "creative"],
    createdBy: 2,
  },
  {
    id: 9,
    title: "Hackathon 2026",
    description: "48-hour coding marathon where teams compete to build innovative solutions. Prizes, food, and fun all night long!",
    category: "workshop",
    start_date: "2026-02-20T18:00:00",
    end_date: "2026-02-22T18:00:00",
    location: "Innovation Hub",
    capacity: 200,
    registered_count: 200,
    status: "completed",
    image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop",
    organizer: "Developer Student Club",
    tags: ["hackathon", "coding", "competition", "innovation"],
    createdBy: 1,
  },
  {
    id: 10,
    title: "Music Concert Night",
    description: "An evening of live performances featuring student bands and solo artists. Food trucks and good vibes guaranteed!",
    category: "cultural",
    start_date: "2026-02-15T19:00:00",
    end_date: "2026-02-15T23:00:00",
    location: "Campus Amphitheater",
    capacity: 400,
    registered_count: 400,
    status: "completed",
    image_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop",
    organizer: "Music Society",
    tags: ["music", "concert", "live performance", "entertainment"],
    createdBy: 3,
  },
  {
    id: 11,
    title: "Robotics Competition",
    description: "Design, build, and program robots to compete in various challenges. Show off your engineering skills!",
    category: "workshop",
    start_date: "2026-06-01T09:00:00",
    end_date: "2026-06-01T17:00:00",
    location: "Engineering Lab Complex",
    capacity: 80,
    registered_count: 65,
    status: "upcoming",
    image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
    organizer: "Robotics Club",
    tags: ["robotics", "engineering", "competition", "technology"],
    createdBy: 1,
  },
  {
    id: 12,
    title: "Environmental Awareness Walk",
    description: "Join us for a campus clean-up and awareness walk. Make a difference and earn community service hours!",
    category: "social",
    start_date: "2026-06-05T08:00:00",
    end_date: "2026-06-05T12:00:00",
    location: "Campus Main Gate to Green Areas",
    capacity: 100,
    registered_count: 45,
    status: "upcoming",
    image_url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop",
    organizer: "Environmental Club",
    tags: ["environment", "community", "sustainability", "volunteer"],
    createdBy: 2,
  },
];

export function EventProvider({ children }) {
  const [events, setEvents] = useState(initialEvents);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refetchEvents = useCallback(() => {
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchEvents();
    }, 20000);
    return () => clearInterval(interval);
  }, [refetchEvents]);

  const addEvent = (newEvent, userId) => {
    const event = {
      ...newEvent,
      id: Date.now(),
      registered_count: 0,
      status: "upcoming",
      createdBy: userId,
    };
    setEvents((prev) => [event, ...prev]);
    return event;
  };

  const deleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  const toggleEventStatus = (eventId) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, status: e.status === "upcoming" ? "completed" : "upcoming" }
          : e
      )
    );
  };

  const updateEvent = (eventId, updates) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, ...updates } : e))
    );
  };

  const registerForEvent = (eventId) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, registered_count: Math.min(e.registered_count + 1, e.capacity) }
          : e
      )
    );
  };

  const cancelRegistration = (eventId) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, registered_count: Math.max(e.registered_count - 1, 0) }
          : e
      )
    );
  };

  const getEventById = (eventId) => {
    return events.find((e) => e.id === parseInt(eventId));
  };

  const getEventsByUser = (userId) => {
    return events.filter((e) => e.createdBy === userId);
  };

  const value = {
    events,
    lastUpdated,
    refetchEvents,
    addEvent,
    deleteEvent,
    toggleEventStatus,
    updateEvent,
    registerForEvent,
    cancelRegistration,
    getEventById,
    getEventsByUser,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
}

export default EventContext;
