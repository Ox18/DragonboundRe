import { db } from "../lib/connection";

export class AccountRepository {
    constructor() {
        this.accountModel = db.Account;
    }

    async findByWhere(where) {
        const account = await this.accountModel.findOne({
            where
        });
        return account?.get();
    }

    async create(account) {
        return await this.accountModel.create(account);
    }
}