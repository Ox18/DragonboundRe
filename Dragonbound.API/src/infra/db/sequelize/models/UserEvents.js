export default (connection, Sequelize) => {
    const model = connection.define("user_events", {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
        },
        cash_24h: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        cash_4h: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    });
    return model;
}