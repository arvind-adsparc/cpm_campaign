import mongoose, { Mongoose } from "mongoose";

const cpmDatabaseSchema = new Mongoose.Schema({
  partner: {
    type: String,
  },
  inventory_type: {
    type: String,
  },
  gaming_inventory_type: {
    type: String,
  },
  categories: {
    type: String,
  },
  publisher_name: {
    type: String,
  },
  appstore: {
    type: String,
  },
  ad_format: {
    type: String,
  },
  app_id: {
    type: String,
  },
  app_name: {
    type: String,
  },
  ad_unit_name: {
    type: String,
  },
  publisher_net_price: {
    type: String,
  },
  gam_cpm: {
    type: String,
  },
  adSparc_marign_media: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CPMDatabase = mongoose.model("CPMDatabase", cpmDatabaseSchema);

module.exports = CPMDatabase;
