import { Repository } from "../lib/repository";

export class UserAvatarsRepository extends Repository {
    constructor() {
        super();
        this.model = this.db.UserAvatars;
    }
}