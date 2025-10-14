import React from "react";
import UserNavbar from "../components/UserNavbar";

export default function UserLayout({ children }) {
  return (
    <>
      <UserNavbar />
      <main className="mr-section container">{children}</main>
    </>
  );
}
