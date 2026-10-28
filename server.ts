import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import apiRoutes from "./server/routes/index";
import { errorHandler } from "./server/middlewares/error.middleware";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON body parsers
app.use(express.json());

// Integrate our complete, production-ready backend API routing
app.use("/api", apiRoutes);

// Centralized error handling middleware
app.use(errorHandler);

// Start Server after setting up Vite Dev Server (or serving static in Prod)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files serving enabled.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
