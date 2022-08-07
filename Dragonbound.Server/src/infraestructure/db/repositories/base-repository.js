import { connection } from "../config/connection"


export class BaseRepository {
    constructor(model) {
        const instance = new model();
        this.model = connection.define(instance.collectionName, instance.schema);
    }

    async findOne(where) {
        return this.model.findOne({
            where
        });
    }

    async make(data) {
        const response = await this.model.create(data);
        return response.toJSON();
    }

    async findAll() {
        const response = await this.model.findAll();
        return response.map(item => item.toJSON());
    }
}