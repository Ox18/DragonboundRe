import { Account } from "../../types/model";
import { AccountModel } from "../../models/account.model";
import { AccountImpl } from "infraestructure/implementation/account.impl";

const accountRepository: AccountImpl = {
  deleteAll: async (): Promise<void> => {
    await AccountModel.deleteMany({});
  },
  bulk: async (accounts: any[]): Promise<void> => {
    await AccountModel.insertMany(accounts);
  },
  signIn: async (data): Promise<Account | null> => {
    const account = await AccountModel.findOne(data);

    if (!account) {
      return null;
    }

    return account;
  },
  getById(id: string): Promise<Account | null> {
    const account = AccountModel.findById(id);

    if (!account) {
      return null;
    }

    return account;
  }
};

export default accountRepository;
