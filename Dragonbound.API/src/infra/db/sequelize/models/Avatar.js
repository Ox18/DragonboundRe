export default (connection, Sequelize) => {
    const model = connection.define("avatar", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        n: {
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
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        filename: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        animation: {
            type: Sequelize.JSON,
            allowNull: false,
        },
        visible: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        min_rank: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        note: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        gold_week: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        gold_month: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        gold_perm: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        cash_week: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        cash_month: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        cash_perm: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        stat_pop: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        stat_time: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        stat_atk: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        stat_def: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        stat_life: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        stat_item: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        stat_dig: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        stat_shld: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        remove_time: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });
    return model;
}