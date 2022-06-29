import { Sequelize } from "sequelize";
import { mysqlConfig } from "./mysql-config";

// Models
import Account from "../models/Account";
import User from "../models/User";
import Server from "../models/Server";

const connection = new Sequelize(...mysqlConfig);

const db = {};
db.Sequelize = Sequelize;
db.connection = connection;
db.Account = Account(connection, Sequelize);
db.User = User(connection, Sequelize);
db.Server = Server(connection, Sequelize);

export {
	db,
	connection
}
