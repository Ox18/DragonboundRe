export default (connection, Sequelize) => {
    const User = connection.define("users", {
        account_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
        },
        rank: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ''
        },
        game_id: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'm'
        },
        gp: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1000
        },
        gold: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 500000
        },
        cash: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 20000
        },
        unlock: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        photo_url: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "",
        }, 
        name_changes: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    });
    return User;
}