import mongoose from "mongoose";
import { Model } from "./model";
import { config } from "@/config";
import { GuildMember } from "@/domain/models/guild-member.model";

const configModel = config.database.guild;

const schema = new mongoose.Schema({
  guild: String,
  user: {
    type: String,
    required: true,
    unique: true,
  },
  job: Number,
});

export default Model<GuildMember>({
  connection: configModel.connection,
  schema,
  collection: "guildMember",
});
