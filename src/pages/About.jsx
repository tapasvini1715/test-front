// src/pages/About.jsx
import React, { useEffect } from "react";
import Footer from "../components/Footer";

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.5 }
    );
    document
      .querySelectorAll(".animate-on-scroll, .about-section")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="modern-about-page">
      <main className="about-fullpage">
        {/* ---------- Hero Section ---------- */}
        <section className="about-section hero-section">
          <div className="hero-content-center">
            <h1 className="hero-title">About MastoRide</h1>
            <p className="hero-subtitle">
              Redefining campus and city rides with trust, technology, and transparency.
            </p>
          </div>
        </section>

        {/* ---------- Mission Section ---------- */}
        <section className="about-section mission-section animate-on-scroll">
          <div className="section-inner">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              At <strong>MastoRide</strong>, we believe commuting should be smart,
              safe, and sustainable. What started as a small idea at a university hackathon
              has evolved into a platform empowering students and professionals
              to travel affordably while reducing environmental impact.
            </p>
          </div>
        </section>

        {/* ---------- Story Section ---------- */}
        <section className="about-section story-section animate-on-scroll">
          <div className="section-inner">
            <h2 className="section-title">Our Story</h2>
            <p className="section-text">
              Founded by passionate students, MastoRide was built with one mission —
              to make transportation reliable and human again. We grew from a simple
              carpool idea to a connected ecosystem that helps people share rides,
              save costs, and meet new people safely.
            </p>
            <p className="section-text">
              What drives us is not just movement — it’s connection, innovation, and
              community. We’re proud to bring technology and empathy together on every ride.
            </p>
          </div>
        </section>

        {/* ---------- Values Section ---------- */}
        <section className="about-section values-section animate-on-scroll">
          <div className="section-inner">
            <h2 className="section-title">Our Core Values</h2>
            <ul className="values-list">
              <li><strong>Safety First:</strong> Every user is verified and rides are monitored securely.</li>
              <li><strong>Affordability:</strong> Shared rides mean shared savings — for everyone.</li>
              <li><strong>Sustainability:</strong> Fewer cars, cleaner air, better tomorrow.</li>
              <li><strong>Community:</strong> We connect people, not just locations.</li>
            </ul>
          </div>
        </section>

        {/* ---------- Future Section ---------- */}
        <section className="about-section future-section animate-on-scroll">
          <div className="section-inner">
            <h2 className="section-title">The Road Ahead</h2>
            <p className="section-text">
              MastoRide is on a journey to expand across campuses and cities,
              integrating smart route algorithms, electric mobility, and real-time ride insights.
              Every update takes us closer to a future where travel feels effortless, safe,
              and sustainable.
            </p>
            <p className="section-text">
              Join us as we shape the future of mobility — one MastoRide at a time.
            </p>
          </div>
        </section>

        {/* ---------- Footer ---------- */}
        <Footer />
      </main>
    </div>
  );
}
