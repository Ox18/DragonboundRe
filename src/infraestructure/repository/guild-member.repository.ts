import { GuildMember } from "@/domain/models/guild-member.model";
import guildMemberModel from "../models/guild-member.model";

export class GuildMemberRepository {
  static getByUser(user: string): Promise<GuildMember | null> {
    return guildMemberModel.findOne({ user });
  }

  static async bulk(guildMembers: any): Promise<void> {
    await guildMemberModel.insertMany(guildMembers);
  }

  static async deleteAll(): Promise<void> {
    await guildMemberModel.deleteMany({});
  }
}
