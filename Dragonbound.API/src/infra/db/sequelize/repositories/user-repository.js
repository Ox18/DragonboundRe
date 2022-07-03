import { Repository } from "../lib/repository";

export class UserRepository extends Repository {
    constructor() {
        super();
        this.model = this.db.User;
    }
}