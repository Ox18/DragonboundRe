import { Repository } from "../lib/repository";

export class AvatarRepository extends Repository {
    constructor() {
        super();
        this.model = this.db.Avatar;
    }
}