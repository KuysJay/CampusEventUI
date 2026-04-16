import { useState } from "react";
import { useUsers } from "../../context";
import { Card, Badge, Button, Modal } from "../../components/common";
import styles from "./ManageUsers.module.css";

const faculties = ["Engineering", "Arts & Humanities", "Sports Science", "Business", "Science", "Medicine", "Law", "Education"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Graduate"];

export default function ManageUsers() {
  const { users, addUser, updateUser, deleteUser } = useUsers();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFaculty, setFilterFaculty] = useState("");

  const emptyUser = {
    name: "",
    email: "",
    faculty: "Engineering",
    year: "1st Year",
  };

  const [newUser, setNewUser] = useState(emptyUser);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFaculty = !filterFaculty || user.faculty === filterFaculty;
    return matchesSearch && matchesFaculty;
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    addUser({
      ...newUser,
      role: "Student",
      registeredEvents: [],
      pastEvents: [],
      hoursAttended: 0,
      interests: [],
    });
    setShowCreateModal(false);
    setNewUser(emptyUser);
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    updateUser(userToEdit.id, userToEdit);
    setShowEditModal(false);
    setUserToEdit(null);
  };

  const openEditModal = (user) => {
    setUserToEdit({ ...user });
    setShowEditModal(true);
  };

  const handleDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setUserToDelete(null);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2>Manage Users</h2>
          <p>{users.length} users total</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>+ Add User</Button>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <select
          value={filterFaculty}
          onChange={(e) => setFilterFaculty(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Faculties</option>
          {faculties.map((fac) => (
            <option key={fac} value={fac}>{fac}</option>
          ))}
        </select>
      </div>

      <Card>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Faculty</th>
                <th>Year</th>
                <th>Events</th>
                <th>Hours</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.empty}>No users found</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.avatar}>
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className={styles.userInfo}>
                          <span className={styles.userName}>{user.name}</span>
                          <span className={styles.userEmail}>{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{user.faculty}</td>
                    <td>{user.year}</td>
                    <td>
                      <span className={styles.count}>
                        {user.registeredEvents?.length || 0}
                      </span>
                    </td>
                    <td>{user.hoursAttended}h</td>
                    <td>
                      <Badge variant="success" size="small">Active</Badge>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} onClick={() => openEditModal(user)} title="Edit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => setUserToDelete(user)} title="Delete">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={!!userToDelete} onClose={() => setUserToDelete(null)} title="Delete User">
        <p>Are you sure you want to delete "{userToDelete?.name}"? This action cannot be undone.</p>
        <div className={styles.modalActions}>
          <Button variant="ghost" onClick={() => setUserToDelete(null)}>Cancel</Button>
          <Button variant="error" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Add New User">
        <form onSubmit={handleCreateUser} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Faculty</label>
              <select value={newUser.faculty} onChange={(e) => setNewUser({ ...newUser, faculty: e.target.value })}>
                {faculties.map((fac) => (
                  <option key={fac} value={fac}>{fac}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Year</label>
              <select value={newUser.year} onChange={(e) => setNewUser({ ...newUser, year: e.target.value })}>
                {years.map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.modalActions}>
            <Button variant="ghost" type="button" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            <Button type="submit">Add User</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit User">
        {userToEdit && (
          <form onSubmit={handleEditUser} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" value={userToEdit.name} onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })} required />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" value={userToEdit.email} onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })} required />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Faculty</label>
                <select value={userToEdit.faculty} onChange={(e) => setUserToEdit({ ...userToEdit, faculty: e.target.value })}>
                  {faculties.map((fac) => (
                    <option key={fac} value={fac}>{fac}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Year</label>
                <select value={userToEdit.year} onChange={(e) => setUserToEdit({ ...userToEdit, year: e.target.value })}>
                  {years.map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>
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
