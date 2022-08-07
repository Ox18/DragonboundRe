import { Sequelize } from "sequelize";
import { AccountSequelizeModel } from "../../../domains/models/account";
import { ServerSequelizeModel } from "../../../domains/models/server";
import { UserSequelizeModel } from "../../../domains/models/user";
import { AvatarSequelizeModel } from "../../../domains/models/avatar";
import env from "../../../main/config/env";

export const connection = new Sequelize(env.db.database, env.db.user, env.db.password, {
    host: env.db.host,
    dialect: "mysql",
    logging: false
});

const account = AccountSequelizeModel.create();
connection.define(account.collectionName, account.schema);
const user = UserSequelizeModel.create();
connection.define(user.collectionName, user.schema);
const servers = ServerSequelizeModel.create();
connection.define(servers.collectionName, servers.schema);
const avatars = AvatarSequelizeModel.create();
connection.define(avatars.collectionName, avatars.schema);
