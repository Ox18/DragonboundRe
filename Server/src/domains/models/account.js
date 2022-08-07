import { Sequelize } from "sequelize";

export class AccountSequelizeModel {
    collectionName = "accounts";

    schema = {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
        }
    }

    static create() {
        return new AccountSequelizeModel();
    }
}