import { Guild } from "@/domain/models/guild.model";
import guildModel from "../models/guild.model";

export class GuildRepository {
  static getById(id: string = null): Promise<Guild | null> {
    if (!id) {
      return null;
    }

    return guildModel.findById(id);
  }

  static async bulk(guilds: any): Promise<void> {
    await guildModel.insertMany(guilds);
  }

  static async deleteAll(): Promise<void> {
    await guildModel.deleteMany({});
  }
}
