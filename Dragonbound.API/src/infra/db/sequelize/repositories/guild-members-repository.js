import { Repository } from "../lib/repository";

export class GuildMembersRepository extends Repository {
    constructor() {
        super();
        this.model = this.db.GuildMembers;
    }
}