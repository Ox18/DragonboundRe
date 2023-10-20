import { Account } from "../../types/model";

export interface AccountImpl {
  deleteAll(): Promise<void>;
  bulk(accounts: any[]): Promise<void>;
  signIn(data: { username: string, password: string }): Promise<Account | null>;
  getById(id: string): Promise<Account | null>;
}