import { Repository } from "../lib/repository";

export class UserAvatarEquippedRepository extends Repository {
    constructor() {
        super();
        this.model = this.db.UserAvatarEquipped;
    }
}