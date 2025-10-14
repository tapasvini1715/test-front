import { ToastProvider } from "./components/ui-kit";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FAQ from "./pages/FAQ";
import ForgotPassword from "./pages/ForgotPassword";

 /*Vini code Starts*/
import BookingRecords from "./pages/admin/BookingRecords";
import Manage from "./pages/admin/Manage";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import UserAbout from "./pages/user/About";
import PreviousRides from "./pages/user/PreviousRides";
 /*Vini code Ends*/


// User pages
import UserDashboard from "./pages/user/UserDashboard";
import BookRide from "./pages/user/BookRide"; // ✅ NEW

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { getUser } from "./utils/session";

// Protected route for admin
const AdminRoute = ({ children }) => {
  const user = getUser();
  return user && user.role === "admin" ? children : <Navigate to="/admin/login" replace />;
};

// Protected route for users
const UserRoute = ({ children }) => {
  const user = getUser();
  return user && user.role === "user" ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            /*Vini code Starts*/

            <Route path="/admin/bookings" element={<BookingRecords />} />
            <Route path="/admin/manage" element={<Manage />} />
            <Route path="/user/dashboard" element={<Dashboard />} />


            {/* Admin pages */}
            <Route path="/admin/bookings" element={<BookingRecords />} />
            <Route path="/admin/manage" element={<Manage />} />

            {/* User pages */}
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/about" element={<UserAbout />} />
            <Route path="/user/previous-rides" element={<PreviousRides />} />

           /*Vini code Ends*/ 

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* User */}
            <Route
              path="/user/dashboard"
              element={
                <UserRoute>
                  <UserDashboard />
                </UserRoute>
              }
            />
            <Route
              path="/user/book-ride"              // ✅ NEW
              element={
                <UserRoute>
                  <BookRide />
                </UserRoute>
              }
            />

            {/* Admin */}
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
              path="/admin/profile"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
