// src/pages/About.jsx
import React, { useEffect } from "react";

export default function About() {
  useEffect(() => {
    // Reuse the same scroll animation observer as Home
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.6 }
    );

    document
      .querySelectorAll(".animate-on-scroll, .fullpage-section")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="modern-about-page">
      <main className="home-fullpage">
        {/* ---------- Hero Section ---------- */}
        <section className="fullpage-section hero-section animate-on-scroll">
          <div className="hero-content-center">
            <h1 className="hero-title">About MastoRide</h1>
            <p className="hero-subtitle">
              Making everyday travel smarter, safer, and sustainable.
            </p>
          </div>
        </section>

        {/* ---------- Mission Section ---------- */}
        <section className="fullpage-section home-safety animate-on-scroll">
          <div className="section-inner">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              MastoRide was born from a student project to revolutionize urban
              and campus commuting. Our goal is simple — connect people through
              reliable, eco-friendly rides while cutting costs and emissions.
            </p>
          </div>
        </section>

        {/* ---------- Story Section ---------- */}
        <section className="fullpage-section home-affordable animate-on-scroll">
          <div className="section-inner">
            <h2 className="section-title">Our Story</h2>
            <p className="section-text">
              What started as a late-night hackathon idea grew into a movement.
              We noticed thousands of students and professionals facing daily
              travel hassles — so we built a smarter way to share rides and
              connect communities. From small beginnings, MastoRide has grown
              into a trusted network of riders, drivers, and dreamers.
            </p>
          </div>
        </section>

        {/* ---------- Values Section ---------- */}
        <section className="fullpage-section animate-on-scroll">
          <div className="section-inner">
            <h2 className="section-title">Our Values</h2>
            <ul className="values-list">
              <li><strong>Safety:</strong> Verified users, monitored rides.</li>
              <li><strong>Affordability:</strong> Shared rides = shared savings.</li>
              <li><strong>Sustainability:</strong> Every shared ride reduces carbon footprint.</li>
              <li><strong>Innovation:</strong> We combine AI and data to make travel seamless.</li>
            </ul>
          </div>
        </section>

        {/* ---------- Future Section ---------- */}
        <section className="fullpage-section animate-on-scroll">
          <div className="section-inner">
            <h2 className="section-title">The Road Ahead</h2>
            <p className="section-text">
              We’re expanding MastoRide to universities, companies, and cities,
              bringing electric vehicle integration and intelligent route
              suggestions. Our journey continues — towards a future where every
              ride makes a difference.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
