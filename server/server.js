import express from "express";
import cors from "cors";
import records from "./record/record.js";
import { handleLogin, authMiddleware } from "./api/auth.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 5050;
const app = express();

// CORS — restrict to allowed origins
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://localhost:4173", // vite preview
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// Public route — admin login
app.post("/login", handleLogin);

// Public routes — GET (read-only, needed by the frontend)
app.use("/", records);

// Global error handler (handles malformed JSON, CORS errors, etc.)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS error: Origin not allowed" });
  }
  console.error("Unhandled error:", err);
  return res.status(500).json({ error: "Internal server error" });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
