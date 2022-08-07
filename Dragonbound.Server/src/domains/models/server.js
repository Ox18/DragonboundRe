import { Sequelize } from 'sequelize';

export class ServerSequelizeModel {
    collectionName = "servers";

    schema = {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        subtype: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        port: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        player_online: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        max_player: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        min_level: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        max_level: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        is_active: {
            type: Sequelize.BOOLEAN,
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
        return new ServerSequelizeModel();
    }
}