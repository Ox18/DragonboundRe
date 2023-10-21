import mongoose from "mongoose";
import { Model } from "./model";
import { config } from "@/config";
import { Guild } from "@/domain/models/guild.model";

const configModel = config.database.guild;

const schema = new mongoose.Schema({
  name: String,
});

export default Model<Guild>({
  connection: configModel.connection,
  schema,
  collection: configModel.collection,
});
