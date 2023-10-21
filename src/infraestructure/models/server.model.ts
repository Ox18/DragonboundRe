import mongoose from "mongoose";
import { config } from "@/config";
import { Model } from "./model";
import { Server } from "@/domain/models/server.model";

const configModel = config.database.servers;

const schema = new mongoose.Schema({
  name: String,
  ip: String,
  port: Number,
  playersOnline: Number,
  maxPlayers: Number,
  rank: {
    min: Number,
    max: Number,
  },
  identifier: Number,
});

export default Model<Server>({
  connection: configModel.connection,
  schema,
  collection: configModel.collection,
});
