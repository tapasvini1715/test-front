// src/pages/user/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getUser } from "../../utils/session";
import { useToast } from "../../components/ui-kit";
import {
  getProfile,
  saveProfile,
  getSettings,
  saveSettings,
} from "../../utils/data";

// Demo KPIs (kept)
const KPI = [
  { id: "points", label: "Reward Points", value: "250", icon: "🎯" },
  { id: "rides", label: "Total Rides", value: "12", icon: "🚗" },
  { id: "tier", label: "Membership Tier", value: "Silver", icon: "⭐" },
  { id: "saved", label: "Total Saved", value: "$45.5", icon: "💰" },
];

export default function UserDashboard() {
  const { pushToast } = useToast();

  // --- auth/session ---
  const [authChecked, setAuthChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // --- tabs / ui ---
  const [activeTab, setActiveTab] = useState("profile");

  // --- profile/settings data ---
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    studentId: "",
    email: "",
    phone: "",
  });
  const [settings, setSettings] = useState({ rideAlerts: true, marketing: false });

  // Stable display name for hero
  const [displayName, setDisplayName] = useState("");

  // --- book ride data ---
  const [ride, setRide] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    passengers: 1,
    vehicleType: "economy", // economy | premium | xl
  });
  const [fare, setFare] = useState(null);
  const [estimating, setEstimating] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");

  const VEHICLES = {
    economy: { label: "🚕 Economy", multiplier: 1, note: "Best value • Multiplier ×1" },
    premium: { label: "🚘 Premium", multiplier: 2, note: "Luxury ride • Multiplier ×2" },
    xl: { label: "🚐 XL", multiplier: 1.5, note: "6 seats • Multiplier ×1.5" },
  };

  // Load session once
  useEffect(() => {
    const u = getUser();
    setCurrentUser(u || null);
    setAuthChecked(true);
  }, []);

  // Load stored profile/settings when we know the user
  useEffect(() => {
    if (!currentUser) return;
    const uid = currentUser.id || "demo-user";

    const stored = getProfile(uid);
    setProfile({
      name: stored.name || currentUser.name || "user1",
      studentId: stored.studentId || currentUser.studentId || "PFW123456",
      email: stored.email || currentUser.email || "user1@pfw.edu",
      phone: stored.phone || currentUser.phone || "",
    });

    setSettings(getSettings(uid));
    setDisplayName(stored.name || currentUser.name || "user1");
  }, [currentUser]);

  if (!authChecked) return null;
  if (!currentUser || currentUser.role !== "user")
    return <Navigate to="/login" replace />;

  const uid = currentUser.id || "demo-user";

  // ----- profile handlers -----
  function onProfileChange(e) {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  }

  async function onSaveProfile(e) {
    e.preventDefault();
    setSavingProfile(true);
    try {
      if (!/\S+@\S+\.\S+/.test(profile.email)) {
        pushToast("Please enter a valid email.", "error");
        return;
      }
      saveProfile(uid, profile);
      setDisplayName(profile.name);
      pushToast("Profile saved!", "success");
    } catch {
      pushToast("Could not save profile.", "error");
    } finally {
      setSavingProfile(false);
    }
  }

  // ----- settings handlers -----
  function onToggleSetting(key) {
    setSettings((s) => ({ ...s, [key]: !s[key] }));
  }

  async function onSaveSettings(e) {
    e.preventDefault();
    setSavingSettings(true);
    try {
      saveSettings(uid, settings);
      pushToast("Settings saved!", "success");
    } catch {
      pushToast("Could not save settings.", "error");
    } finally {
      setSavingSettings(false);
    }
  }

  // ----- book ride handlers -----
  const handleEstimateFare = (e) => {
    e.preventDefault();
    setEstimating(true);

    const base = 3.5;
    const perMile = 1.75;
    const distance = Math.floor(Math.random() * 10) + 1; // mock 1–10 mi
    const mult = VEHICLES[ride.vehicleType].multiplier;
    const total = (base + distance * perMile) * ride.passengers * mult;

    // small delay for feedback
    setTimeout(() => {
      setFare(total.toFixed(2));
      setEstimating(false);
    }, 300);
  };

  const handleBookRide = (e) => {
    e.preventDefault();
    setConfirmMsg(
      `✅ Ride confirmed for ${ride.date || "(date)"} at ${
        ride.time || "(time)"
      } from ${ride.pickup || "(pickup)"} to ${ride.dropoff || "(drop-off)"} • ${
        VEHICLES[ride.vehicleType].label
      }.`
    );
  };

  return (
    <>
      <Navbar />

      <div className="simple-user">
        {/* HERO */}
        <section className="ud-hero">
          <h1>Welcome back, {displayName || "user"}! 👋</h1>
          <p>Manage your account and view your ride history</p>
        </section>

        {/* KPIs */}
        <section className="ud-kpis">
          {KPI.map((k) => (
            <article key={k.id} className="ud-kpi">
              <div className="ud-kpi-icon">{k.icon}</div>
              <div className="ud-kpi-value">{k.value}</div>
              <div className="ud-kpi-label">{k.label}</div>
            </article>
          ))}
        </section>

        {/* Tabs */}
        <div className="ud-toolbar">
          <div className="ud-tabs">
            {[
              ["profile", "Profile"],
              ["book", "Book Ride"],
              ["payment", "Payment"],
              ["rewards", "Rewards"],
              ["history", "History"],
              ["support", "Support"],
              ["settings", "Settings"],
            ].map(([id, label]) => (
              <button
                key={id}
                className={`ud-tab ${activeTab === id ? "is-active" : ""}`}
                onClick={() => setActiveTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* PROFILE */}
        {activeTab === "profile" && (
          <section className="ud-panel ud-panel--max">
            <header className="ud-head">
              <h2>Account Details</h2>
              <p>Update your personal information</p>
            </header>

            <form className="ud-form" onSubmit={onSaveProfile}>
              <label className="ud-field">
                <span>Full Name</span>
                <input
                  name="name"
                  type="text"
                  value={profile.name}
                  onChange={onProfileChange}
                />
              </label>

              <label className="ud-field">
                <span>Student ID</span>
                <input name="studentId" type="text" value={profile.studentId} readOnly />
                <small>Assigned by PFW</small>
              </label>

              <label className="ud-field">
                <span>Email Address</span>
                <input name="email" type="email" value={profile.email} readOnly />
              </label>

              <label className="ud-field">
                <span>Phone Number</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="(260) 555-0123"
                  value={profile.phone}
                  onChange={onProfileChange}
                />
              </label>

              <button className="btn wide" type="submit" disabled={savingProfile}>
                {savingProfile ? "Saving..." : "Save Profile"}
              </button>
            </form>
          </section>
        )}

        {/* BOOK RIDE */}
        {activeTab === "book" && (
          <section className="ud-panel ud-panel--max">
            <header className="ud-head">
              <h2>Book a Ride 🚗</h2>
              <p>Plan your next ride and estimate the fare instantly.</p>
            </header>

            <form className="ud-form">
              <label className="ud-field">
                <span>Pickup Location</span>
                <input
                  type="text"
                  placeholder="Enter pickup point"
                  value={ride.pickup}
                  onChange={(e) => setRide({ ...ride, pickup: e.target.value })}
                />
              </label>

              <label className="ud-field">
                <span>Drop-off Location</span>
                <input
                  type="text"
                  placeholder="Enter destination"
                  value={ride.dropoff}
                  onChange={(e) => setRide({ ...ride, dropoff: e.target.value })}
                />
              </label>

              <div className="ud-row">
                <label className="ud-field">
                  <span>Date</span>
                  <input
                    type="date"
                    value={ride.date}
                    onChange={(e) => setRide({ ...ride, date: e.target.value })}
                  />
                </label>
                <label className="ud-field">
                  <span>Time</span>
                  <input
                    type="time"
                    value={ride.time}
                    onChange={(e) => setRide({ ...ride, time: e.target.value })}
                  />
                </label>
              </div>

              <div className="ud-row">
                <label className="ud-field">
                  <span>Passengers</span>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={ride.passengers}
                    onChange={(e) =>
                      setRide({
                        ...ride,
                        passengers: parseInt(e.target.value || "1", 10),
                      })
                    }
                  />
                </label>

                <label className="ud-field">
                  <span>Vehicle Type</span>
                  <select
                    value={ride.vehicleType}
                    onChange={(e) => setRide({ ...ride, vehicleType: e.target.value })}
                  >
                    {Object.entries(VEHICLES).map(([key, v]) => (
                      <option key={key} value={key}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                  <small>{VEHICLES[ride.vehicleType].note}</small>
                </label>
              </div>

              {/* Estimate button shows the fare INSIDE the button */}
              <div className="br-actions">
                <button
                  type="button"
                  onClick={handleEstimateFare}
                  className="estimate-btn"
                  disabled={estimating}
                >
                  {estimating
                    ? "Estimating…"
                    : fare
                    ? `💵 Estimated Fare: $${fare}`
                    : "Estimate Fare"}
                </button>
              </div>

              <button className="btn wide" onClick={handleBookRide} type="submit">
                Confirm Booking
              </button>
            </form>

            {confirmMsg && <div className="confirm-msg">{confirmMsg}</div>}
          </section>
        )}

        {/* PAYMENT */}
        {activeTab === "payment" && (
          <section className="ud-panel ud-panel--max">
            <header className="ud-head">
              <h2>Payment</h2>
              <p>Manage your saved methods and receipts</p>
            </header>

            <div className="ud-empty">
              <div className="ud-chip">💳</div>
              <p>No payment methods saved yet.</p>
              <button className="btn">Add Card</button>
            </div>
          </section>
        )}

        {/* REWARDS */}
        {activeTab === "rewards" && (
          <section className="ud-panel rewards-panel">
            <header>
              <h2>Rewards</h2>
              <p>Track points and redeem perks</p>
            </header>

            <div className="rewards-content">
              <div className="reward-points">🏅 250 Points</div>
              <div className="reward-message">Keep riding to reach Gold tier!</div>
              <button>Redeem</button>
            </div>
          </section>
        )}

        {/* HISTORY */}
        {activeTab === "history" && (
          <section className="ud-panel ud-panel--max">
            <header className="ud-head">
              <h2>Ride History</h2>
              <p>Your recent campus and off-campus rides</p>
            </header>

            <ul className="ud-list">
              <li className="ud-list-item">
                <div className="ud-ride-info">
                  <strong>09/22</strong> • Campus Center → <b>Jefferson Pointe Mall</b> <br />
                  <span className="ud-destination">📍 Off-Campus Destination — Fort Wayne</span>
                </div>
                <div className="ud-ride-meta">
                  <span className="ud-price">💵 $12.50</span>
                  <span className="ud-pill">Completed</span>
                </div>
              </li>
              <li className="ud-list-item">
                <div className="ud-ride-info">
                  <strong>09/19</strong> • Dorms → <b>Fort Wayne International Airport</b> <br />
                  <span className="ud-destination">📍 Off-Campus Destination — Fort Wayne</span>
                </div>
                <div className="ud-ride-meta">
                  <span className="ud-price">💵 $22.75</span>
                  <span className="ud-pill">Completed</span>
                </div>
              </li>
              <li className="ud-list-item">
                <div className="ud-ride-info">
                  <strong>09/16</strong> • Engineering Building → <b>Electric Works</b> <br />
                  <span className="ud-destination">📍 Off-Campus Destination — Fort Wayne</span>
                </div>
                <div className="ud-ride-meta">
                  <span className="ud-price">💵 $9.80</span>
                  <span className="ud-pill">Completed</span>
                </div>
              </li>
            </ul>
          </section>
        )}

        {/* SUPPORT */}
        {activeTab === "support" && (
          <section className="ud-panel ud-panel--max">
            <header className="ud-head">
              <h2>Support</h2>
              <p>We’re here to help</p>
            </header>
            <div className="ud-empty">
              <div className="ud-chip">🛟</div>
              <p>Need assistance? Start a ticket or visit the Help Center.</p>
              <div className="ud-actions">
                <button className="btn">Open Ticket</button>
                <button className="btn ghost">Help Center</button>
              </div>
            </div>
          </section>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <section className="ud-panel ud-panel--max">
            <header className="ud-head">
              <h2>Settings</h2>
              <p>Customize notifications & preferences</p>
            </header>

            <form className="ud-form" onSubmit={onSaveSettings}>
              <div className="setting-item">
                <div>
                  <strong>Ride Alerts</strong>
                  <p>Receive notifications for ride updates</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.rideAlerts}
                    onChange={() => onToggleSetting("rideAlerts")}
                  />
                  <span />
                </label>
              </div>

              <div className="setting-item">
                <div>
                  <strong>Marketing Emails</strong>
                  <p>Get news and promotions</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.marketing}
                    onChange={() => onToggleSetting("marketing")}
                  />
                  <span />
                </label>
              </div>

              <button className="btn wide" type="submit" disabled={savingSettings}>
                {savingSettings ? "Saving..." : "Save Settings"}
              </button>
            </form>
          </section>
        )}
      </div>
    </>
  );
}
