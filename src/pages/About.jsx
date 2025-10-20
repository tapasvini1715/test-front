// src/pages/About.jsx
import React, { useEffect } from "react";
import Footer from "../components/Footer";

export default function About() {
  useEffect(() => {
    // Reuse same animation logic as Home
    const animator = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.6 }
    );

    document
      .querySelectorAll(".animate-on-scroll, .fullpage-section")
      .forEach((el) => animator.observe(el));

    return () => animator.disconnect();
  }, []);

  return (
    <div className="page-wrapper">
      {/* Header section */}
      <section className="fullpage-section about-hero animate-on-scroll">
        <div className="content-center">
          <h1 className="welcome">About MastoRide</h1>
          <p className="lead">
            Empowering students with safe, affordable, and trusted rides—built
            by the community, for the community.
          </p>
        </div>
      </section>

      {/* Mission section */}
      <section className="fullpage-section about-mission animate-on-scroll">
        <div className="content-center">
          <h2>Our Mission</h2>
          <p>
            MastoRide was founded with a simple goal: make student travel safer,
            cheaper, and more connected. By linking verified students from
            nearby universities, we create a reliable network of shared rides
            that reduce costs and build community.
          </p>
        </div>
      </section>

      {/* Vision section */}
      <section className="fullpage-section about-vision animate-on-scroll">
        <div className="content-center">
          <h2>Our Vision</h2>
          <p>
            We envision a future where sustainable mobility is accessible to
            every student—minimizing carbon footprint, enhancing safety, and
            encouraging friendships across campuses.
          </p>
        </div>
      </section>

      {/* Team section */}
      <section className="fullpage-section about-team animate-on-scroll">
        <div className="content-center">
          <h2>Our Team</h2>
          <p>
            We’re a passionate group of students and developers dedicated to
            making everyday travel simple and secure. From engineers to
            designers, every member contributes to keeping your rides smooth and
            dependable.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
