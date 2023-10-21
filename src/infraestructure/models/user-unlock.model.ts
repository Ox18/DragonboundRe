import mongoose from "mongoose";
import { config } from "@/config";
import { Model } from "./model";
import { UserUnlock } from "@/domain/models/user-unlock.model";

const configModel = config.database.user;

const schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  bots: Number,
});

export default Model<UserUnlock>({
  connection: configModel.connection,
  schema,
  collection: "userUnlock",
});
