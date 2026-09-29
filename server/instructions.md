# Server Instructions & Setup Guide

## Quick Start (Monorepo)

From the project root directory (`kerisfullstack/`), you can start both the backend server and client frontend simultaneously:

```sh
# 1. Install all dependencies (both server and client)
npm run install:all

# 2. Run both server and client concurrently
npm run dev
```

The server will start on `http://localhost:5050` and the client on `http://localhost:5173`.

---

## Running Server Standalone

If you prefer to run the server in its own terminal:

```sh
cd server

# 1. Install dependencies
npm install

# 2. Configure environment variables
# Copy .env.example to .env if you haven't already
cp .env.example .env

# 3. Start development server (with native Node file watcher)
npm run dev

# Or start for production
npm start
```

---

## Environment Variables (`server/.env`)

Make sure your `server/.env` file contains the required configuration:

```env
# Server Port
PORT=5050

# MongoDB URI (Atlas Cloud or Local MongoDB Compass)
MONGODB_URI="mongodb+srv://<username>:<password>@your-cluster.mongodb.net/kerisdb?retryWrites=true&w=majority"
# For local MongoDB running on your machine:
# MONGODB_URI="mongodb://127.0.0.1:27017/kerisdb"

# Supabase Storage (for scholar & sponsor image uploads)
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
SUPABASE_BUCKET="keris-uploads"

# Admin Authentication
ADMIN_PASSWORD="your-admin-password"
JWT_SECRET="your-jwt-secret-key"

# CORS Allowed Origin
CLIENT_URL="http://localhost:5173"
```

---

## Troubleshooting & Notes

* **MongoDB Error Code 80 / Connection Timeout**: If you see connection issues or code 80 when using MongoDB Atlas, check that your current public IP address is whitelisted in MongoDB Atlas under **Network Access** (`0.0.0.0/0` allows access from anywhere for development).
* **Local MongoDB**: If you have MongoDB installed locally or are using MongoDB Compass, use `mongodb://127.0.0.1:27017/kerisdb`.
* **Supabase Storage**: Ensure the bucket specified in `SUPABASE_BUCKET` (default: `keris-uploads`) is created and set to **Public** in the Supabase Dashboard under Storage.
