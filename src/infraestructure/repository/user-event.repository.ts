import { UserEvent } from "@/domain/models/user-event.model";
import userEventModel from "../models/user-event.model";

export class UserEventRepository {
  static getByUser(user: string): Promise<UserEvent | null> {
    return userEventModel.findOne({ user });
  }

  static async bulk(userEvents: any[]): Promise<void> {
    await userEventModel.insertMany(userEvents);
  }

  static async deleteAll(): Promise<void> {
    await userEventModel.deleteMany({});
  }
}
