import express from "express";
import cors from "cors";
import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import OfflineStore from "./models/OfflineStore.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// ✅ API route to get product prices dynamically
app.get("/api/prices", async (req, res) => {
  const { product } = req.query;
  if (!product) return res.status(400).json({ error: "Product required" });

  const results = { online: [], offline: [] };

  try {
    // 🛒 1) Fetch real products dynamically from DummyJSON API
    const { data } = await axios.get(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(product)}`
    );

    const onlineProducts = data.products.slice(0, 6).map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price * 83, // convert to INR
      brand: p.brand || "Generic",
      image: p.thumbnail,
      source: "DummyJSON Live API",
    }));

    results.online = onlineProducts;
  } catch (err) {
    console.error("❌ Online API Error:", err.message);
    results.online = [];
  }

  try {
    // 🏬 2) Offline store results (from MongoDB)
    const offlineStores = await OfflineStore.find();

    const offlineResults = offlineStores.map((store) => {
      return {
        storeName: store.name,
        location: store.location,
        products: results.online.map((p) => ({
          title: p.title,
          price: Math.round(p.price * (1 + (Math.random() * 0.15 - 0.07))), // simulate ±7%
          storeName: store.name,
          location: store.location,
        })),
      };
    });

    results.offline = offlineResults;
  } catch (err) {
    console.error("❌ Offline Store Query Error:", err.message);
    results.offline = [];
  }

  results.checkedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  res.json(results);
});

// ✅ Start the backend server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🧠 RefX Backend Running on Port ${PORT}`);
});
