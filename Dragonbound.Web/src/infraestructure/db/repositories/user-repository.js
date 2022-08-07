import { UserModel } from "../../../domains/models/user";
import { BaseRepository } from "./base-repository";

export class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
    }

    static create() {
        return new UserRepository();
    }
}