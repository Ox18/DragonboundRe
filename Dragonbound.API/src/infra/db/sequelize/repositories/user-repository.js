import { Repository } from "../lib/repository";

export class UserRepository extends Repository {
    constructor() {
        this.model = this.db.User;
    }
}