const mongoose = require("mongoose");
import { config } from "../config";
import { Model } from "./model";

const connection = config.database.servers.connection;

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
})

const collection = "servers";

export default Model({
  connection,
  schema,
  collection,
})