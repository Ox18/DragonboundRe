import { db } from "./connection";

export class Repository {
    db = db;
    model;

    constructor() {

    }

    async findByWhere(where) {
        const model = await this.model.findOne({
            where
        });
        return model?.get();
    }

    async create(model) {
        const response = await this.model.create(model);
        return response?.get();
    }

    async findAll() {
        const models = await this.model.findAll();
        return models.map(model => model.get());
    }

    async delete(where) {
        const model = await this.model.destroy({
            where
        });
        return model;
    }

    async update(where, model) {
        const response = await this.model.update(model, {
            where
        });
        return response;
    }
}