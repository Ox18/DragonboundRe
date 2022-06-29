import { Sequelize } from "sequelize";
import { mysqlConfig } from "./mysql-config";
import Account from "../models/Account";
import User from "../models/User";

const connection = new Sequelize(...mysqlConfig);

const db = {};
db.Sequelize = Sequelize;
db.connection = connection;
db.Account = Account(connection, Sequelize);
db.User = User(connection, Sequelize);

export {
	db,
	connection
}
