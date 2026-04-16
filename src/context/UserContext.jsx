import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

const mockUsers = [
  { id: 1, name: "Alex Johnson", email: "alex@university.edu", role: "Student", faculty: "Engineering", year: "3rd Year", registeredEvents: [1, 3, 5], pastEvents: [7, 8, 9], hoursAttended: 48, interests: ["workshop", "seminar"] },
  { id: 2, name: "Sarah Chen", email: "sarah@university.edu", role: "Student", faculty: "Arts & Humanities", year: "2nd Year", registeredEvents: [1, 3, 4], pastEvents: [8, 9], hoursAttended: 32, interests: ["cultural", "social"] },
  { id: 3, name: "Mike Rodriguez", email: "mike@university.edu", role: "Student", faculty: "Sports Science", year: "4th Year", registeredEvents: [1, 4, 5], pastEvents: [7, 8, 9, 10], hoursAttended: 86, interests: ["sports", "social"] },
  { id: 4, name: "Emily Davis", email: "emily@university.edu", role: "Student", faculty: "Business", year: "1st Year", registeredEvents: [2, 6], pastEvents: [], hoursAttended: 12, interests: ["workshop"] },
  { id: 5, name: "James Wilson", email: "james@university.edu", role: "Student", faculty: "Science", year: "3rd Year", registeredEvents: [1, 2, 4, 5, 6], pastEvents: [7, 8], hoursAttended: 64, interests: ["seminar", "workshop"] },
  { id: 6, name: "Maria Garcia", email: "maria@university.edu", role: "Student", faculty: "Medicine", year: "5th Year", registeredEvents: [1, 2, 3, 4, 5, 6], pastEvents: [7, 8, 9, 10], hoursAttended: 120, interests: ["seminar", "cultural", "social"] },
];

export function UserProvider({ children }) {
  const [users, setUsers] = useState(mockUsers);

  const addUser = (newUser) => {
    const user = {
      ...newUser,
      id: Date.now(),
      registeredEvents: [],
      pastEvents: [],
      hoursAttended: 0,
      interests: [],
    };
    setUsers((prev) => [user, ...prev]);
    return user;
  };

  const updateUser = (userId, updates) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updates } : u))
    );
  };

  const deleteUser = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const getUserById = (userId) => {
    return users.find((u) => u.id === parseInt(userId));
  };

  const value = {
    users,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
}

export default UserContext;
