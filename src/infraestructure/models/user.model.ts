import mongoose from "mongoose";
import { Model } from "./model";
import { User } from "@/domain/models/user.model";
import { config } from "@/config";

const configModel = config.database.user;

const schema = new mongoose.Schema({
  nickname: String,
  rank: Number,
  country: String,
  account: String,
  gp: Number,
  gold: Number,
  cash: Number,
  photoUrl: String,
})

export default Model<User>({
  connection: configModel.connection,
  schema,
  collection: configModel.collection,
});
