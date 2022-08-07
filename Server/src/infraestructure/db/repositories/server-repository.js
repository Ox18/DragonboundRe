import { ServerSequelizeModel } from "../../../domains/models/server";
import { BaseRepository } from "./base-repository";

export class ServerRepository extends BaseRepository {
    constructor() {
        super(ServerSequelizeModel);
    }

    static create() {
        return new ServerRepository();
    }

    async deleteAll() {
        return await this.model.destroy({ where: {} });
    }
}