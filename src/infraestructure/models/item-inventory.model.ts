import mongoose from "mongoose";
import { Model } from "./model";
import { config } from "@/config";
import { ItemInventory } from "@/domain/models/item-inventory.model";

const configModel = config.database.items;

const schema = new mongoose.Schema({
  user: String,
  item: String,
});

export default Model<ItemInventory>({
  connection: configModel.connection,
  schema,
  collection: "itemInventory",
});
