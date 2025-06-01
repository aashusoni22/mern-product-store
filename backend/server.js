import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware to parse JSON in the request body
app.use(express.json());

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT} 🚀`);
});
