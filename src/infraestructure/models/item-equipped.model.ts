import mongoose from "mongoose";
import { Model } from "./model";
import { config } from "@/config";
import { ItemEquipped } from "@/domain/models/item-equipped.model";

const configModel = config.database.items;

const schema = new mongoose.Schema({
  head: Number,
  body: Number,
  eyes: Number,
  flag: Number,
  background: Number,
  foreground: Number,
  user: {
    type: String,
    required: true,
    unique: true,
  },  
});

export default Model<ItemEquipped>({
  connection: configModel.connection,
  schema,
  collection: "itemsEquipped",
});
