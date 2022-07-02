import { Repository } from "../lib/repository";

export class UserRelationshipRepository extends Repository {
    constructor() {
        super();
        this.model = this.db.UserRelationship;
    }
}