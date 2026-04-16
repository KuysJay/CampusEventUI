# Campus Event Management System - Design Specification

## 1. System Overview

**Project Name:** CampusEventUI
**Type:** Full-stack Web Application
**Purpose:** Manage campus events, registrations, scheduling, and communications

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite |
| Routing | React Router v7 |
| State | Context API + TanStack Query |
| Styling | CSS Modules / CSS Variables |
| Backend API | REST API (mock/placeholder) |

---

## 3. User Roles

| Role | Permissions |
|------|-------------|
| **Student** | Browse events, register/cancel, view profile |
| **Organizer** | Create/edit events, view attendees, manage registrations |
| **Admin** | Full access, user management, analytics dashboard |

---

## 4. Core Features

### 4.1 Event Management
- Event listing with filtering (category, date, location)
- Event details page with full information
- Create/Edit/Delete events (Organizer+)
- Event categories (Workshop, Seminar, Social, Sports, Cultural)
- Event status (Upcoming, Ongoing, Completed, Cancelled)

### 4.2 Registration System
- Register for events
- Cancel registration
- View registered events
- Capacity management
- Waitlist functionality

### 4.3 User Management
- User authentication (Login/Register)
- User profile with avatar
- Role-based access control
- Password management

### 4.4 Dashboard
- Personal calendar view
- Upcoming events
- Event statistics (for organizers)
- Quick actions

### 4.5 Search & Discovery
- Search events by keyword
- Filter by category, date range, location
- Sort by date, popularity, name

---

## 5. Page Structure

```
/                       → Home (Hero + Featured Events)
/events                 → Event Listing
/events/:id             → Event Details
/events/create          → Create Event (Protected)
/events/:id/edit        → Edit Event (Protected)
/dashboard              → User Dashboard (Protected)
/dashboard/my-events    → My Registered Events
/dashboard/managed      → Managed Events (Organizer+)
/login                  → Login Page
/register               → Registration Page
/profile                → User Profile
/admin                  → Admin Panel (Admin only)
```

---

## 6. Database Schema (Conceptual)

### Users
```
- id: int (PK)
- email: string (unique)
- password_hash: string
- name: string
- role: enum (student, organizer, admin)
- avatar_url: string
- created_at: datetime
```

### Events
```
- id: int (PK)
- title: string
- description: text
- category: enum
- start_date: datetime
- end_date: datetime
- location: string
- capacity: int
- organizer_id: int (FK)
- status: enum
- image_url: string
- created_at: datetime
```

### Registrations
```
- id: int (PK)
- user_id: int (FK)
- event_id: int (FK)
- status: enum (confirmed, waitlist, cancelled)
- registered_at: datetime
```

---

## 7. Component Architecture

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Badge.jsx
│   │   └── Loading.jsx
│   ├── events/
│   │   ├── EventCard.jsx
│   │   ├── EventList.jsx
│   │   ├── EventFilters.jsx
│   │   └── EventForm.jsx
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   └── user/
│       ├── UserAvatar.jsx
│       └── ProfileCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── Events.jsx
│   ├── EventDetails.jsx
│   ├── CreateEvent.jsx
│   ├── Dashboard.jsx
│   ├── MyEvents.jsx
│   ├── Profile.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Admin.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── EventContext.jsx
│   └── ThemeContext.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useEvents.js
│   └── useRegistration.js
├── services/
│   └── api.js
├── utils/
│   ├── constants.js
│   └── helpers.js
└── styles/
    ├── variables.css
    └── global.css
```

---

## 8. API Endpoints

```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/auth/me

GET    /api/events
GET    /api/events/:id
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id

GET    /api/events/:id/registrations
POST   /api/events/:id/register
DELETE /api/events/:id/register

GET    /api/users/:id
PUT    /api/users/:id
```

---

## 9. Design System

### Color Palette
```
Primary:    #aa3bff (Purple)
Secondary:  #3b82f6 (Blue)
Success:    #22c55e (Green)
Warning:    #f59e0b (Amber)
Error:      #ef4444 (Red)

Light Mode:
- Background: #ffffff
- Surface: #f8fafc
- Text Primary: #08060d
- Text Secondary: #6b6375
- Border: #e5e4e7

Dark Mode:
- Background: #16171d
- Surface: #1f2028
- Text Primary: #f3f4f6
- Text Secondary: #9ca3af
- Border: #2e303a
```

### Typography
```
Font Family: system-ui, 'Segoe UI', Roboto, sans-serif
Headings: 500 weight, tight letter-spacing
Body: 18px, 1.45 line-height
```

### Spacing
```
Base unit: 4px
Scale: 4, 8, 12, 16, 24, 32, 48, 64px
```

---

## 10. Implementation Phases

### Phase 1: Foundation
- [ ] Set up project structure
- [ ] Design system (CSS variables, common components)
- [ ] Layout components (Navbar, Sidebar)
- [ ] Routing setup

### Phase 2: Core Features
- [ ] Event listing page
- [ ] Event details page
- [ ] Event card component
- [ ] Search & filters

### Phase 3: Authentication
- [ ] Login/Register pages
- [ ] Auth context
- [ ] Protected routes
- [ ] User profile

### Phase 4: Event Management
- [ ] Create/Edit event form
- [ ] Registration system
- [ ] My events page
- [ ] Dashboard

### Phase 5: Polish
- [ ] Animations
- [ ] Loading states
- [ ] Error handling
- [ ] Responsive design
