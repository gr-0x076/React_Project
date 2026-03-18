import { useState, useEffect } from "react";

const BLOOD_GROUPS = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

// ─── DonorCard ─────────────────────────────────────────────────────────────
// Pure props component — zero local state. All data flows down from App.
function DonorCard({ donor, isRequested, onRequest }) {
  return (
    <div className={`blood-card ${donor.available ? "" : "unavailable"}`}>

      <span className={`blood-badge ${donor.available ? "" : "badge-busy"}`}>
        {donor.available ? "● Available" : "● Busy"}
      </span>

      <h3 className="donor-name">{donor.name}</h3>

      {/* Gold pulsing blood group — heartbeat animation via CSS */}
      <div className="blood-group-display" aria-label={`Blood group ${donor.bloodGroup}`}>
        {donor.bloodGroup}
      </div>

      <div className="donor-meta">
        <span>📍 {donor.city}</span>
        <span>✉ {donor.email}</span>
      </div>

      {/* blood-btn + request-sent toggled via isRequested prop */}
      <button
        className={`blood-btn ${isRequested ? "request-sent" : ""}`}
        onClick={() => onRequest(donor.id)}
        disabled={isRequested || !donor.available}
        aria-label={
          isRequested
            ? `Request already sent to ${donor.name}`
            : `Request blood from ${donor.name}`
        }
      >
        {isRequested ? "Request Sent ✅" : "Request Help"}
      </button>
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────
// Lifted state lives here. Children get props only.
export default function App() {

  // ── State ─────────────────────────────────────────────────────────────────
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");
  // { [donorId]: true } — object map tracks request per donor
  const [requestStatus, setRequestStatus] = useState({});

  // ── useEffect: fetch once on mount ────────────────────────────────────────
  // [] dependency = runs after first render only, never again
  useEffect(() => {
    async function fetchDonors() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch donors");
        const users = await res.json();

        const mapped = users.map((user, index) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          city: user.address.city,
          bloodGroup: BLOOD_GROUPS[index % BLOOD_GROUPS.length],
          available: index % 2 === 0,
        }));

        setDonors(mapped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDonors();
  }, []);

  // ── Derived state — not stored in useState ────────────────────────────────
  const filteredDonors =
    selectedBloodGroup === "All"
      ? donors
      : donors.filter((d) => d.bloodGroup === selectedBloodGroup);

  const availableCount = filteredDonors.filter((d) => d.available).length;

  // ── Lifting state: child calls this, parent updates ───────────────────────
  function handleRequest(donorId) {
    setRequestStatus((prev) => ({ ...prev, [donorId]: true }));
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="royal-bg">

      {/* Hero Header */}
      <header className="blood-hero">
        <p className="hero-eyebrow">◈ Community · Emergency · Connect</p>
        <h1 className="hero-title">Blood Donor Finder</h1>
        <p className="hero-sub">Royal Blood Bank · Est. 2024</p>
      </header>

      <main className="app-content" role="main">

        {loading ? (
          <div className="spinner-wrap" role="status" aria-label="Loading donors">
            <div className="loading-spinner" />
            <p className="spinner-text">Fetching donors...</p>
          </div>

        ) : error ? (
          <div className="error-state" role="alert">
            <p>⚠ {error}</p>
            <p>Check your connection and refresh.</p>
          </div>

        ) : (
          <>
            {/* Controls — controlled dropdown (lifted filter state) */}
            <section className="controls-row" aria-label="Filter donors">
              <div>
                <label htmlFor="blood-filter" className="select-label">
                  Filter by Blood Group
                </label>
                <select
                  id="blood-filter"
                  className="filter-dropdown"
                  value={selectedBloodGroup}
                  onChange={(e) => setSelectedBloodGroup(e.target.value)}
                  aria-label="Select blood group"
                >
                  <option value="All">All Blood Groups</option>
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              {/* counter-badge — derived state displayed */}
              <div className="counter-wrap" role="status" aria-live="polite">
                <span className="counter-badge">
                  {availableCount} Available
                </span>
                <span className="counter-sub">
                  {selectedBloodGroup !== "All" ? `Blood Group · ${selectedBloodGroup}` : "All Groups"}
                </span>
              </div>
            </section>

            {/* Donor Grid */}
            {filteredDonors.length === 0 ? (
              <div className="empty-state" role="status">
                <p>No donors found for <strong>{selectedBloodGroup}</strong>.</p>
                <p>Try a different blood group.</p>
              </div>
            ) : (
              <div className="donor-grid" role="list">
                {filteredDonors.map((donor) => (
                  <DonorCard
                    key={donor.id}
                    donor={donor}
                    isRequested={!!requestStatus[donor.id]}
                    onRequest={handleRequest}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}