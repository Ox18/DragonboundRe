import { User } from "@/domain/models/user.model";
import userModel from "../models/user.model";

export default class UserRepository {
  static async deleteAll(): Promise<void> {
    await userModel.deleteMany({});
  }

  static async bulk(users: any[]): Promise<void> {
    await userModel.insertMany(users);
  }

  static async getByAccount(account: string | null): Promise<User | null> {
    if (!account) {
      return null;
    }

    const user = await userModel.findOne({ account });

    if (!user) {
      return null;
    }

    return user;
  }

  static async getTotal(): Promise<number> {
    return await userModel.countDocuments({});
  }
  
  static async getById(id: string): Promise<User | null> {
    const user = await userModel.findById(id);

    if (!user) {
      return null;
    }

    return user;
  }
}
