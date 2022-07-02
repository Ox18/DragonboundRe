import { Repository } from "../lib/repository";

export class UserEventsRepository extends Repository {
    constructor() {
        super();
        this.model = this.db.UserEvents;
    }
}