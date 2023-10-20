import { User } from "@/types/model"

export interface UserRepositoryImpl {
  deleteAll(): Promise<void>;
  bulk(users: any[]): Promise<void>;
  getByAccount(accountId: string): Promise<User | null>;
  getTotal: () => Promise<number>;
}