import mongoose from "mongoose";

const cpmDatabaseSchema = new mongoose.Schema({
  partner: {
    type: String,
  },
  inventoryType: {
    type: String,
  },
  gamingInventoryType: {
    type: String,
  },
  categories: {
    type: String,
  },
  publisherName: {
    type: String,
  },
  appstore: {
    type: String,
  },
  adFormat: {
    type: String,
  },
  appId: {
    type: String,
  },
  appName: {
    type: String,
  },
  adUnitName: {
    type: String,
  },
  publisherNetPrice: {
    type: String,
  },
  gamCpm: {
    type: String,
  },
  adSparcMarignMedia: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CPMDatabase = mongoose.model("CPMDatabase", cpmDatabaseSchema);

module.exports = CPMDatabase;
