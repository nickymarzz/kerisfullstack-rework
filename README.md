# KERIS Full-Stack

![KERIS](https://github.com/piqim/kerisfullstack/raw/main/assets/logo.png)  
A modernized full-stack web application for KERIS, an initiative aimed at educating students in Kelantan about higher education and scholarships.

## Preview Access

* **Live Site**: [https://kerisfrontend.vercel.app/](https://kerisfrontend.vercel.app/) or <https://kerismy.com>
* **Backend API**: <https://kerisbackend.onrender.com>

> **Note**: The backend instance may sleep on free-tier hosting when inactive for a while.

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Route Map](#route-map)
* [Project Structure](#project-structure)
* [Setup and Installation](#setup-and-installation)
* [Environment Variables](#environment-variables)
* [Contributors](#contributors)
* [License](#license)

---

## Overview

KERIS Full-Stack is a web platform designed to provide students with resources, mentorship, and guidance regarding higher education opportunities. The project modernizes the original static website into a fully dynamic, scalable full-stack application. It connects high school graduates in Malaysia with scholarship resources and mentors who have received scholarships to study locally and overseas.

---

## Features

* **Admin Panel**: Manage mentors/scholars and scholarship records with full CRUD operations.
* **JWT Protected API**: Backend mutations (`POST`, `PATCH`, `DELETE`) are guarded with JWT authentication; public GET endpoints serve read-only data to visitors.
* **Cloud File Storage**: Direct file and image uploads to Supabase Storage with public URL generation.
* **Student Directory & Detail**: Browse scholar mentors by field, university, and background.
* **Scholarship Directory**: Search and explore available scholarships and sponsors.
* **Unified Monorepo Workflow**: Single command `npm run dev` boots both backend and frontend concurrently.
* **CORS Hardened**: API restricted to authorized client origins.

---

## Tech Stack

| Layer              | Technology                                    | Details                                                             |
| ------------------ | --------------------------------------------- | ------------------------------------------------------------------- |
| **Frontend**       | React 19, Vite 6, TailwindCSS                 | SPA with modern React hooks, TipTap editor, and responsive styling  |
| **Backend**        | Node.js, Express.js                           | REST API with native file watching (`node --watch`)                 |
| **Database**       | MongoDB Atlas & Compass                       | Document storage with official MongoDB driver (clean, no heavy ORM) |
| **File Storage**   | Supabase Storage (`@supabase/supabase-js`)    | High-speed cloud image bucket storage                               |
| **Authentication** | Built-in Node `crypto` / HS256 JWT            | Secure token-based API authentication for admin actions             |
| **Hosting**        | Vercel (Frontend), Render / Railway (Backend) | Free-tier compatible cloud hosting                                  |

---

## Route Map

### Client Routes (Public)
* `/` — Home Page (Hero, Mission, Highlights)
* `/scholars` — Scholar Mentors Directory
* `/scholars/:id` — Scholar Detail Profile
* `/scholarships` — Scholarship Directory
* `/scholarships/:id` — Scholarship Detail

### Admin Routes (Protected)
* `/login` — Admin Authentication
* `/admin` — Admin Dashboard
* `/admin/scholars` — Manage Scholars (Add / Edit / Delete)
* `/admin/scholarships` — Manage Scholarships (Add / Edit / Delete)

---

## Project Structure

```text
kerisfullstack/
├── package.json              # Monorepo root runner (concurrently)
├── client/                   # Frontend Vite + React application
│   ├── src/
│   │   ├── components/       # Pages, forms, lists, editors
│   │   ├── assets/           # Styles, images, scripts
│   │   └── App.jsx           # App routes and layout
│   ├── tailwind.config.js    # TailwindCSS configuration
│   ├── vite.config.js        # Vite configuration
│   └── .env.example          # Client environment template
├── server/                   # Backend Express.js REST API
│   ├── api/
│   │   └── auth.js           # JWT auth handler & middleware
│   ├── db/
│   │   ├── connection.js     # MongoDB connection
│   │   └── supabase.js       # Supabase Storage helper
│   ├── record/
│   │   └── record.js         # API routes for scholars & sponsors
│   ├── server.js             # Express server entry point
│   ├── instructions.md       # Detailed server instructions
│   └── .env.example          # Server environment template
└── README.md
```

---

## Setup and Installation

### Prerequisites

* [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
* [Git](https://git-scm.com/)
* [MongoDB](https://www.mongodb.com/) (Local instance, MongoDB Compass, or a free MongoDB Atlas cluster)
* [Supabase Account](https://supabase.com/) (Free tier for image storage)

---

### Step 1: Clone the Repository

```sh
git clone https://github.com/nickymarzz/kerisfullstack-rework.git
cd kerisfullstack-rework
```

---

### Step 2: Configure Environment Variables

1. **Backend (`server/.env`)**:
   ```sh
   cp server/.env.example server/.env
   ```
   Fill in your MongoDB URI, Supabase credentials, and admin credentials in `server/.env`.

2. **Frontend (`client/.env`)**:
   ```sh
   cp client/.env.example client/.env
   ```
   Default is: `VITE_REACT_APP_BACKEND_BASEURL=http://localhost:5050`

---

### Step 3: Install Dependencies

From the project root directory:

```sh
npm run install:all
```

---

### Step 4: Run the Application

#### Option A: Unified Runner (Recommended)

Run both backend and frontend concurrently in a single terminal from the root:

```sh
npm run dev
```

* **Client**: [http://localhost:5173](http://localhost:5173)
* **Server**: [http://localhost:5050](http://localhost:5050)

#### Option B: Separate Terminals

* **Server Terminal**:
  ```sh
  cd server
  npm run dev
  ```

* **Client Terminal**:
  ```sh
  cd client
  npm run dev
  ```

---

## Environment Variables

### `server/.env`
| Variable                    | Description                         | Example / Default                                          |
| --------------------------- | ----------------------------------- | ---------------------------------------------------------- |
| `PORT`                      | Backend server port                 | `5050`                                                     |
| `MONGODB_URI`               | MongoDB connection URI              | `mongodb+srv://...` or `mongodb://127.0.0.1:27017/kerisdb` |
| `SUPABASE_URL`              | Supabase project URL                | `https://xxxx.supabase.co`                                 |
| `SUPABASE_ANON_KEY`         | Supabase Anon Key                   | `sb_publishable_...`                                       |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key           | `sb_secret_...`                                            |
| `SUPABASE_BUCKET`           | Supabase Storage bucket name        | `keris-uploads`                                            |
| `ADMIN_PASSWORD`            | Password required to log in         | Your chosen password                                       |
| `JWT_SECRET`                | Secret key used to sign auth tokens | Any secure random string                                   |
| `CLIENT_URL`                | Frontend origin allowed for CORS    | `http://localhost:5173`                                    |

### `client/.env`
| Variable                         | Description                    | Default                 |
| -------------------------------- | ------------------------------ | ----------------------- |
| `VITE_REACT_APP_BACKEND_BASEURL` | URL of the running backend API | `http://localhost:5050` |

---

## Contributors

* **Mustaqim (Piqim)** - [<https://github.com/piqim>](https://github.com/piqim) - Main Contributor: Developed backend and front-end environments.
* **Dayana** - [<https://github.com/dayansyahz>](https://github.com/dayansyahz) - Contributor: Home page design migration.
* **Zai** - [<https://github.com/zainatulzahirah>](https://github.com/zainatulzahirah) - Contributor: Home page design migration.
* **NickyMarzz** - [<https://github.com/nickymarzz>](https://github.com/nickymarzz) - Tech Stack Modernization, JWT Auth, Supabase Storage, and Monorepo Integration.

---

## License

This project is licensed under the [MIT License](LICENSE).
