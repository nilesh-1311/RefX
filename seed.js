import mongoose from "mongoose";
import dotenv from "dotenv";
import OfflineStore from "./models/OfflineStore.js";

dotenv.config();

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB — Adding sample stores...");

    // Clear old data
    await mongoose.connection.db.dropCollection("offlinestores").catch(() => {});

    // ✅ All stores at the same location
    const stores = [
      { name: "TechWorld Electronics", location: "Tamil Nadu, Chennai, Tambaram West", products: [] },
      { name: "MobileMart", location: "Tamil Nadu, Chennai, Tambaram West", products: [] },
      { name: "City Gadgets", location: "Tamil Nadu, Chennai, Tambaram West", products: [] },
      { name: "ElectroHub", location: "Tamil Nadu, Chennai, Tambaram West", products: [] },
      { name: "GadgetGalaxy", location: "Tamil Nadu, Chennai, Tambaram West", products: [] },
      { name: "SmartZone", location: "Tamil Nadu, Chennai, Tambaram West", products: [] },
      { name: "MegaMobile Store", location: "Tamil Nadu, Chennai, Tambaram West", products: [] },
      { name: "FutureTech Electronics", location: "Tamil Nadu, Chennai, Tambaram West", products: [] },
      { name: "Digital Plaza", location: "Tamil Nadu, Chennai, Tambaram West", products: [] },
      { name: "NextGen Mobiles", location: "Tamil Nadu, Chennai, Tambaram West", products: [] },
    ];

    await OfflineStore.insertMany(stores);
    console.log("✅ Sample stores added successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  }
}

seedData();
