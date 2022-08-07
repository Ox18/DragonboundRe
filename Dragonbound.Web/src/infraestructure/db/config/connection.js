import { Sequelize } from "sequelize";
import { AccountModel } from "../../../domains/models/account";
import { ServerModel } from "../../../domains/models/server";
import { UserModel } from "../../../domains/models/user";
import env from "../../../main/config/env";

export const connection = new Sequelize(env.db.database, env.db.user, env.db.password, {
    host: env.db.host,
    dialect: "mysql",
    logging: false
});

const account = AccountModel.create();
connection.define(account.collectionName, account.schema);
const user = UserModel.create();
connection.define(user.collectionName, user.schema);
const servers = ServerModel.create();
connection.define(servers.collectionName, servers.schema);