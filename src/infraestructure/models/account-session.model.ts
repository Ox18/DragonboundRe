import mongoose from "mongoose";
import { Model } from "./model";
import { config } from "@/config";
import { AccountSession } from "@/domain/models/account-session.model";

const configModel = config.database.account;

const schema = new mongoose.Schema({
  sessionID: String,
  origin: String,
  ip: String,
  agent: String,
  agentVersion: String,
  os: String,
  cookie: String,
  account: String,
});

export default Model<AccountSession>({
  connection: configModel.connection,
  schema,
  collection: 'session',
});
