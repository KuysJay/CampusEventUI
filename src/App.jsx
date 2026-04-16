import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/index.js";
import AdminLayout from "./components/layout/AdminLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import { lazy, Suspense } from "react";
import { Loading } from "./components/common/index.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Events = lazy(() => import("./pages/Events.jsx"));
const EventDetails = lazy(() => import("./pages/EventDetails.jsx"));
const CreateEvent = lazy(() => import("./pages/CreateEvent.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const ManageEvents = lazy(() => import("./pages/admin/ManageEvents.jsx"));
const ManageUsers = lazy(() => import("./pages/admin/ManageUsers.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function LoadingFallback() {
  return <Loading fullPage text="Loading..." />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <Home />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <Events />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <EventDetails />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/create"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <CreateEvent />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <Dashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <Profile />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <AdminDashboard />
                </Suspense>
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <ManageEvents />
                </Suspense>
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <ManageUsers />
                </Suspense>
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
