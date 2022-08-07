import { ServerModel } from "../../../domains/models/server";
import { BaseRepository } from "./base-repository";

export class ServerRepository extends BaseRepository {
    constructor() {
        super(ServerModel);
    }

    static create() {
        return new ServerRepository();
    }
}