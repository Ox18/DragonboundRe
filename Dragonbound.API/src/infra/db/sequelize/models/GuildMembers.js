export default (connection, Sequelize) => {
    const model = connection.define("guild_members", {
        guild_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
        },
        job: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    });
    return model;
}