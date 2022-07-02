export default (connection, Sequelize) => {
    const model = connection.define("guild", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        user_master_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });
    return model;
}