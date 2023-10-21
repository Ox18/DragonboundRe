

import { Account } from "@/domain/models/account.model";
import accountModel from "../models/account.model";

export default class AccountRepository {
  static async deleteAll(): Promise<void> {
    await accountModel.deleteMany({});
  }

  static async bulk(accounts: any[]): Promise<void> {
    await accountModel.insertMany(accounts);
  }

  static async signIn(data: {
    username: string;
    password: string;
  }): Promise<Account | null> {
    const account = await accountModel.findOne(data);

    if (!account) {
      return null;
    }

    return account;
  }

  static getById(id: string): Promise<Account | null> {
    const account = accountModel.findById(id);

    if (!account) {
      return null;
    }

    return account;
  }
}