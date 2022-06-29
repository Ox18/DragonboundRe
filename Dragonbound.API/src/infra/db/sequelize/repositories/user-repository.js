import { db } from "../lib/connection";

export class UserRepository {
    constructor() {
        this.userModel = db.User;
    }

    async findByWhere(where) {
        const user = await this.userModel.findOne({
            where
        });
        return user?.get();
    }
}