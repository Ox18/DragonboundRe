export default (connection, Sequelize) => {
    const model = connection.define("user_avatars", {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        avatar_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        avatar_type: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        purchased_price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        price_type: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        }
    });
    return model;
}