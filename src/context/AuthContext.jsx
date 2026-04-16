import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const mockUserDatabase = {
  "alex@university.edu": {
    id: 1,
    email: "alex@university.edu",
    name: "Alex Johnson",
    role: "Computer Science Student",
    memberSince: "September 2024",
    bio: "Passionate about AI and web development. Always looking for opportunities to learn and grow.",
    faculty: "Engineering",
    year: "3rd Year",
    registeredEvents: [1, 3, 5],
    pastEvents: [7, 8, 9],
    hoursAttended: 48,
    interests: ["workshop", "seminar"],
  },
  "sarah@university.edu": {
    id: 2,
    email: "sarah@university.edu",
    name: "Sarah Chen",
    role: "Arts Student",
    memberSince: "January 2025",
    bio: "Creative soul who loves cultural events and social gatherings.",
    faculty: "Arts & Humanities",
    year: "2nd Year",
    registeredEvents: [1, 3, 4],
    pastEvents: [8, 9],
    hoursAttended: 32,
    interests: ["cultural", "social"],
  },
  "mike@university.edu": {
    id: 3,
    email: "mike@university.edu",
    name: "Mike Rodriguez",
    role: "Sports Club President",
    memberSince: "August 2023",
    bio: "Sports enthusiast and event organizer. Always on the move!",
    faculty: "Sports Science",
    year: "4th Year",
    registeredEvents: [1, 4, 5],
    pastEvents: [7, 8, 9, 10],
    hoursAttended: 86,
    interests: ["sports", "social"],
  },
};

const mockAdminDatabase = {
  "admin@campus.edu": {
    id: 100,
    email: "admin@campus.edu",
    name: "Admin User",
    role: "Administrator",
    isAdmin: true,
  },
};

const STORAGE_KEY = "campus_events_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, _password) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const normalizedEmail = email.toLowerCase();
      
      if (mockAdminDatabase[normalizedEmail]) {
        const adminUser = { ...mockAdminDatabase[normalizedEmail], isLoggedIn: true };
        setUser(adminUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
        return { success: true, isAdmin: true };
      }
      
      const mockUser = mockUserDatabase[normalizedEmail] || {
        id: Date.now(),
        email: normalizedEmail,
        name: email.split("@")[0].split(".").map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(" "),
        role: "Student",
        memberSince: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        bio: "",
        faculty: "General",
        year: "1st Year",
        registeredEvents: [],
        pastEvents: [],
        hoursAttended: 0,
        interests: [],
      };
      
      const loggedInUser = { ...mockUser, isLoggedIn: true };
      setUser(loggedInUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
      return { success: true, isAdmin: false };
    } catch {
      return { success: false, error: "Login failed" };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, _password) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const newUser = {
        id: Date.now(),
        email: email.toLowerCase(),
        name,
        role: "Student",
        memberSince: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        bio: "",
        faculty: "General",
        year: "1st Year",
        registeredEvents: [],
        pastEvents: [],
        hoursAttended: 0,
        interests: [],
        isLoggedIn: true,
      };
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      return { success: true };
    } catch {
      return { success: false, error: "Registration failed" };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = (updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const registerForEvent = (eventId) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        registeredEvents: [...(prev.registeredEvents || []), eventId],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const cancelRegistration = (eventId) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        registeredEvents: (prev.registeredEvents || []).filter((id) => id !== eventId),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    registerForEvent,
    cancelRegistration,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
