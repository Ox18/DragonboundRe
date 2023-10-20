const mongoose = require("mongoose");
import { config } from "../config";
import { Model } from "./model";

const connection = config.database.user.connection;

const schema = new mongoose.Schema({
  nickname: String,
  rank: Number,
  country: String,
  account: String,
})

const collection = "users";

export const UserModel = Model({
  connection,
  schema,
  collection,
})