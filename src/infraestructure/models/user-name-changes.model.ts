import mongoose from "mongoose";
import { config } from "@/config";
import { Model } from "./model";
import { UserNameChanges } from "@/domain/models/user-name-changes.model";

const configModel = config.database.user;

const schema = new mongoose.Schema({
  user: String,
  from: String,
  to: String,
});

export default Model<UserNameChanges>({
  connection: configModel.connection,
  schema,
  collection: "userNameChanges",
});
