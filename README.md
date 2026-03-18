# 🩸 Community Blood Donor Finder

A React single-page application built as part of a frontend development syllabus project. Allows users to browse blood donors, filter by blood group, and send help requests — all with a dark Obsidian Elite theme.

---

## 🚀 Live Demo

> Run locally — see setup instructions below.

---

## 📌 Features

- Fetches donor data from a public REST API on mount
- Filter donors by blood group (All, A+, B+, AB+, O+, A-, B-, AB-, O-)
- Donor cards showing name, blood group, city, and availability status
- "Request Help" button toggles to "Request Sent ✅" per donor
- Live counter showing available donors for selected filter
- Loading spinner while fetching, empty state when no matches
- Persists nothing to server — purely client-side state
- Responsive and mobile-first layout

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI library |
| Vite | Build tool & dev server |
| JavaScript (ES6+) | Logic |
| CSS3 | Styling (no external UI library) |

---

## 📚 Concepts Demonstrated

- `useState` — managing donors list, filter, loading, and request state
- `useEffect` — fetching API data on component mount (empty dependency array)
- **Lifting state up** — all shared state lives in `App`, passed down via props
- **Derived state** — `filteredDonors` and `availableCount` computed from state, not stored
- **Controlled components** — dropdown value driven by React state
- **Props** — `DonorCard` is a pure display component, zero local state
- **Conditional rendering** — loading / error / empty / content states
- **React keys** — stable `donor.id` used, never array index

---

## 📁 Project Structure

```
blood-donor-finder/
├── public/
├── src/
│   ├── App.jsx        # All logic — state, effects, filtering, components
│   ├── index.css      # Obsidian Elite · Royal Blood Bank theme
│   └── main.jsx       # Vite entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Setup & Run

**Prerequisites:** Node.js installed

```bash
# 1. Clone the repo
git clone https://github.com/gr-0x076/React_Project.git

# 2. Move into the project
cd React_Project/blood-donor-finder

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🌐 API Used

**JSONPlaceholder** — `https://jsonplaceholder.typicode.com/users`

Free fake REST API. Returns 10 users. Blood groups, availability, and city are mapped from the raw user data on the client side.

---

## 🎨 Theme

**Obsidian Elite · Royal Blood Bank**
- Background: `#101118` deep obsidian
- Cards: glassmorphism with `backdrop-filter: blur`
- Blood red accent: `#b3283e` (desaturated, not harsh)
- Gold accent: `#c9a973` (used sparingly)
- Font: `system-ui, -apple-system` (clean, no external font dependency)

---

## 📝 Syllabus Topics Covered

- Introduction to React
- React Essentials (build tools, lists, forms, props, state)
- State Management Basics (useState, useEffect, lifting state)

---

## 👤 Author

**gr-0x076**
[github.com/gr-0x076](https://github.com/gr-0x076)
