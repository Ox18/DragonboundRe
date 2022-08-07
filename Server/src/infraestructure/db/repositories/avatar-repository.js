import { AvatarSequelizeModel } from "../../../domains/models/avatar";
import { BaseRepository } from "./base-repository";

export class AvatarRepository extends BaseRepository {
    constructor() {
        super(AvatarSequelizeModel);
    }

    static create() {
        return new AvatarRepository();
    }
}