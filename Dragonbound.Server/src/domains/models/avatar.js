import { Sequelize } from 'sequelize';


export class AvatarSequelizeModel {
    collectionName = "avatars";

    schema = {
        number: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        gender: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        filename: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        min_rank: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        note: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        gold_week: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        gold_month: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        gold_perm: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        cash_week: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        cash_month: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        cash_perm: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stat_pop: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stat_time: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stat_atk: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stat_def: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stat_life: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stat_item: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stat_dig: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stat_shld: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        remove_time: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now')
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
        },
        animation: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: []
        },
        visible: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }

    static create() {
        return new AvatarSequelizeModel();
    }
}