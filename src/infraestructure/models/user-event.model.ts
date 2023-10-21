import mongoose from "mongoose";
import { config } from "@/config";
import { Model } from "./model";
import { UserEvent } from "@/domain/models/user-event.model";

const configModel = config.database.user;

const schemConfig = new mongoose.Schema(
  {
    leftTime: Number,
    config: {
      cash: Number,
      gold: Number,
      timeWait: Number,
    },
  },
  {
    _id: false,
  }
);

const schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  events: {
    facebook: schemConfig,
    hourly: schemConfig,
  },
});

export default Model<UserEvent>({
  connection: configModel.connection,
  schema,
  collection: "userEvents",
});
