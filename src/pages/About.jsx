// src/pages/About.jsx
import React, { useEffect } from "react";

export default function About() {
  useEffect(() => {
    // Scroll animation (same as Home)
    const animator = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.5 }
    );

    document
      .querySelectorAll(".animate-on-scroll, .fullpage-section")
      .forEach((el) => animator.observe(el));

    return () => animator.disconnect();
  }, []);

  // Inline styles for sections
  const sectionStyle = (bg) => ({
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    padding: "2rem",
    transition: "opacity 1s ease, transform 1s ease",
    opacity: 0,
    transform: "translateY(30px)",
  });

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 2,
    maxWidth: "800px",
  };

  const animateInStyle = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0px) !important;
    }
  `;

  return (
    <>
      {/* Inline animation style */}
      <style>{animateInStyle}</style>

      {/* Hero Section */}
      <section
        className="fullpage-section animate-on-scroll"
        style={sectionStyle("/assets/about-hero.jpg")}
      >
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            About MastoRide
          </h1>
          <p style={{ fontSize: "1.25rem", lineHeight: "1.7" }}>
            Safe, affordable, and trusted rides — built by students, for
            students.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section
        className="fullpage-section animate-on-scroll"
        style={sectionStyle("/assets/about-mission.jpg")}
      >
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Our Mission
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
            To make student travel safer and more connected by providing a
            verified network for sharing rides between campuses. Every trip you
            take helps reduce carbon footprint while building a stronger student
            community.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section
        className="fullpage-section animate-on-scroll"
        style={sectionStyle("/assets/about-vision.jpg")}
      >
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Our Vision
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
            We envision a future where students across the country can travel
            freely, affordably, and safely — powered by technology that puts
            trust and sustainability first.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section
        className="fullpage-section animate-on-scroll"
        style={sectionStyle("/assets/about-team.jpg")}
      >
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Our Team</h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
            MastoRide was created by a group of passionate developers and
            students who believe every journey can be more than just a ride —
            it’s a chance to connect, collaborate, and grow together.
          </p>
        </div>
      </section>
    </>
  );
}
