import { Sequelize } from 'sequelize';

export class AvatarEquippedModel {
    collectionName = "avatar_equipped";

    schema = {
        head: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        body: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        eyes: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        flag: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        background: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        foreground: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }

}
