import { ItemEquipped } from "@/domain/models/item-equipped.model";
import itemEquippedModel from "../models/item-equipped.model";

export class ItemEquippedRepository {
  static getByUser(user: string): Promise<ItemEquipped | null> {
    return itemEquippedModel.findOne({ user });
  }

  static async bulk(itemEquipped: any[]): Promise<void> {
    await itemEquippedModel.insertMany(itemEquipped);
  }

  static async deleteAll(): Promise<void> {
    await itemEquippedModel.deleteMany({});
  }
}
