import mongoose from "mongoose";
import { Model } from "./model";
import { config } from "@/config";
import { Account } from "@/domain/models/account.model";

const configModel = config.database.account;

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

export default Model<Account>({
  connection: configModel.connection,
  schema,
  collection: configModel.collection,
});
