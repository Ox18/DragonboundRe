import { AccountModel } from "../../../domains/models/account";
import { BaseRepository } from "./base-repository";

export class AccountRepository extends BaseRepository {
    constructor() {
        super(AccountModel);
    }

    static create() {
        return new AccountRepository();
    }
}