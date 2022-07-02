import { Repository } from "../lib/repository";

export class UserPrixRepository extends Repository {
    constructor() {
        super();
        this.model = this.db.UserPrix;
    }
}