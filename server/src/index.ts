import dotenv from "dotenv";
dotenv.config();
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { log } from "./vite"; // we'll skip vite-specific logic in prod separation
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: process.env.CLIENT_URL, // or your actual frontend domain in prod
  credentials: true,
}));
const httpServer = http.createServer(app);

// Setup WebSocket
const io = new Server(httpServer, {
  cors: {
    origin:  process.env.CLIENT_URL, // Frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  }
});

// Optional: Add io to app locals if needed elsewhere
app.set("io", io);
// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  // Register API routes
  await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  const PORT = process.env.PORT||5000;
  httpServer.listen(PORT, () => {
    log(`✅ Server running at ${process.env.SERVER_URL}${PORT}`);
  });
})();