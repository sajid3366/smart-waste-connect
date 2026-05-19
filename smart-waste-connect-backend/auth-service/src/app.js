import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import correlationIdMiddleware from "./middleware/correlation.js";
import logger from "./lib/logger.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",") || ["http://localhost:3000",],
    credentials: true,
  })
);


// Correlation ID + Logging middleware
app.use(correlationIdMiddleware);

app.get("/auth/health", (req, res) =>
  res.json({ status: "ok", service: "auth" })
);

app.get("/", (req, res) => {
  logger.info({
    message: "Health check route hit",
    correlationId: req.correlationId,
  });
  res.send("Smart Waste [auth] is running properly");
});

// Routes
app.use("/auth", authRoutes);
app.use("/auth", userRoutes);

// Error logging
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    correlationId: req.correlationId,
    stack: err.stack,
  });
  res.status(500).json({ error: "Internal Server Error" });
});


app.listen(PORT, () => {
  logger.info(`✅ Auth service running on port ${PORT}`);
  // console.log(`✅ Auth service running on port ${PORT}`);
});

export default app;
