
import accountSessionModel from "../models/account-session.model";

export default class AccountSessionRepository {
  static async bulk(accounts: any[] | any): Promise<void> {
    await accountSessionModel.insertMany(accounts);
  }
}