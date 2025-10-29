import mongoose from "mongoose";

const OfflineStoreSchema = new mongoose.Schema({
  name: String,
  location: String,
  products: [
    {
      name: String,
      price: Number,
    },
  ],
});

export default mongoose.model("OfflineStore", OfflineStoreSchema);
