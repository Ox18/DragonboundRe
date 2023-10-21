import { UserNameChanges } from "@/domain/models/user-name-changes.model";
import userNameChangesModel from "../models/user-name-changes.model";

export class UserNameChangesRepository {
  static getAllByUser(user: string): Promise<UserNameChanges[]> {
    return userNameChangesModel.find({ user });
  }

  static async bulk(userNameChanges: UserNameChanges[]): Promise<void> {
    await userNameChangesModel.insertMany(userNameChanges);
  }
}
