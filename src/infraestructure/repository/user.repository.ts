import { UserModel } from "@/models/user.model";
import { UserRepositoryImpl } from "../implementation/user.impl";
import { User } from "@/types/model";

export const userRepository: UserRepositoryImpl = {
  deleteAll: async (): Promise<void> => {
    await UserModel.deleteMany({});
  },

  bulk: async (users: any[]): Promise<void> => {
    await UserModel.insertMany(users);
  },

  getByAccount: async (account: string | null): Promise<User | null> => {
    if (!account) {
      return null;
    }

    const user = await UserModel.findOne({ account });

    if (!user) {
      return null;
    }

    return user;
  },

  getTotal: async (): Promise<number> => {
    return await UserModel.countDocuments({});
  }
};

export default userRepository;