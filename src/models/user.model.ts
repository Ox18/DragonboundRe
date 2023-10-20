const mongoose = require("mongoose");
import { config } from "@/config";
import { Model } from "./model";

const connection = config.database.user.connection;

const schema = new mongoose.Schema({
  name: String,
  password: String,
})

const collection = "users";

export const UserModel = Model({
  connection,
  schema,
  collection,
})