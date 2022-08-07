import { UserSequelizeModel } from "../../../domains/models/user";
import { BaseRepository } from "./base-repository";

export class UserRepository extends BaseRepository {
    constructor() {
        super(UserSequelizeModel);
    }

    static create() {
        return new UserRepository();
    }
}