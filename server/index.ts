import cors from "cors";
import express from "express";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  const giftsFile = path.join(__dirname, "data", "gifts.json");

// GET
app.get("/api/gifts", (_req, res) => {
  const data = fs.readFileSync(giftsFile, "utf-8");
  res.json(JSON.parse(data));
});

// CREATE
app.post("/api/gifts", (req, res) => {
  const gifts = JSON.parse(fs.readFileSync(giftsFile, "utf-8"));

  const newGift = {
    id: Date.now(),
    ...req.body,
    status: "available",
  };

  gifts.push(newGift);

  fs.writeFileSync(giftsFile, JSON.stringify(gifts, null, 2));

  res.json(newGift);
});

// UPDATE
app.put("/api/gifts/:id", (req, res) => {
  const gifts = JSON.parse(fs.readFileSync(giftsFile, "utf-8"));

  const index = gifts.findIndex(
    (g: any) => g.id == req.params.id
  );

  if (index === -1) return res.status(404).json({ error: "Not found" });

  gifts[index] = { ...gifts[index], ...req.body };

  fs.writeFileSync(giftsFile, JSON.stringify(gifts, null, 2));

  res.json(gifts[index]);
});

// DELETE
app.delete("/api/gifts/:id", (req, res) => {
  const gifts = JSON.parse(fs.readFileSync(giftsFile, "utf-8"));

  const filtered = gifts.filter((g: any) => g.id != req.params.id);

  fs.writeFileSync(giftsFile, JSON.stringify(filtered, null, 2));

  res.json({ success: true });
});

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = 8000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
