import React from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

export default function UserLayout({ children }) {
  return (
    <div className="user-layout">
      <UserNavbar />
      <main className="user-content">{children}</main>
      <Footer />
    </div>
  );
}




