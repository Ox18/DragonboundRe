import { Repository } from "../lib/repository";

export class GuildRepository extends Repository {
    constructor() {
        super();
        this.model = this.db.Guild;
    }
}