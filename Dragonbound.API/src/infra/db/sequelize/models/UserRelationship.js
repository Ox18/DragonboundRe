export default (connection, Sequelize) => {
    const model = connection.define("user_relationship", {
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "",
        },
        user_id_a: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        user_id_b: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });
    return model;
}