import { Sequelize } from "sequelize";
import { mysqlConfig } from "./mysql-config";
import Account from "../models/Account";

const connection = new Sequelize(...mysqlConfig);

const db = {};
db.Sequelize = Sequelize;
db.connection = connection;
db.Account = Account(connection, Sequelize);

export {
	db,
	connection
}
