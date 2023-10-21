import { ItemInventory } from "@/domain/models/item-inventory.model";
import itemInventoryModel from "../models/item-inventory.model";

export class ItemInventoryRepository {
  static getByItemAndUser(
    item: string,
    user: string
  ): Promise<ItemInventory | null> {
    return itemInventoryModel.findOne({ item, user });
  }

  static async bulk(itemInventory: any[]): Promise<void> {
    await itemInventoryModel.insertMany(itemInventory);
  }

  static async deleteAll(): Promise<void> {
    await itemInventoryModel.deleteMany({});
  }

  static async hasItem(item: string | number): Promise<number> {
    const data = await itemInventoryModel.exists({ item });

    return data ? 1 : 0;
  }
}
