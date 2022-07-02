export default (connection, Sequelize) => {
    const model = connection.define("user_prix", {
        points: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        points_type: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        points_reset_price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
        }
    });
    return model;
}