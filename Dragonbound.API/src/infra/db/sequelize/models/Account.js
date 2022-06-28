export default (connection, Sequelize) => {
	const Account = connection.define("accounts", {
		username: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		}
	});
	return Account;
}