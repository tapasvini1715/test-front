import { ToastProvider } from "./components/ui-kit";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FAQ from "./pages/FAQ";
import ForgotPassword from "./pages/ForgotPassword";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BookingRecords from "./pages/admin/BookingRecords";
import Manage from "./pages/admin/Manage";

// User pages
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import UserAbout from "./pages/user/About";
import BookRide from "./pages/user/BookRide";
import PreviousRides from "./pages/user/PreviousRides";

// Layouts
import UserLayout from "./layouts/UserLayout";

// Utils
import { getUser } from "./utils/session";

// Protected routes
const AdminRoute = ({ children }) => {
  const user = getUser();
  return user && user.role === "admin" ? children : <Navigate to="/admin/login" replace />;
};

const UserRoute = ({ children }) => {
  const user = getUser();
  return user && user.role === "user" ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* ✅ User Layout with Protected Routes */}
          <Route
            path="/user/dashboard"
            element={
              <UserRoute>
                <UserLayout>
                  <Dashboard />
                </UserLayout>
              </UserRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <UserRoute>
                <UserLayout>
                  <Profile />
                </UserLayout>
              </UserRoute>
            }
          />
          <Route
            path="/user/book-ride"
            element={
              <UserRoute>
                <UserLayout>
                  <BookRide />
                </UserLayout>
              </UserRoute>
            }
          />
          <Route
            path="/user/about"
            element={
              <UserRoute>
                <UserLayout>
                  <UserAbout />
                </UserLayout>
              </UserRoute>
            }
          />
          <Route
            path="/user/previous-rides"
            element={
              <UserRoute>
                <UserLayout>
                  <PreviousRides />
                </UserLayout>
              </UserRoute>
            }
          />

          {/* ✅ Admin Layout with Protected Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manage"
            element={
              <AdminRoute>
                <Manage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <AdminRoute>
                <BookingRecords />
              </AdminRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
