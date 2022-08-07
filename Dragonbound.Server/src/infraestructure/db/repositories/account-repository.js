import { AccountSequelizeModel } from "../../../domains/models/account";
import { BaseRepository } from "./base-repository";

export class AccountRepository extends BaseRepository {
    constructor() {
        super(AccountSequelizeModel);
    }

    static create() {
        return new AccountRepository();
    }
}