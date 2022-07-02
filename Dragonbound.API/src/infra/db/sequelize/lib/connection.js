import { Sequelize } from "sequelize";
import { mysqlConfig } from "./mysql-config";

// Models
import Account from "../models/Account";
import User from "../models/User";
import Server from "../models/Server";
import Guild from "../models/Guild";
import GuildMembers from "../models/GuildMembers";
import UserAvatarEquipped from "../models/UserAvatarEquipped";
import UserAvatars from "../models/UserAvatars";
import UserEvents from "../models/UserEvents";
import UserPrix from "../models/UserPrix";
import UserRelationship from "../models/UserRelationship";
import Avatar from "../models/Avatar";


const connection = new Sequelize(...mysqlConfig);

const db = {};
db.Sequelize = Sequelize;
db.connection = connection;
db.Account = Account(connection, Sequelize);
db.User = User(connection, Sequelize);
db.Server = Server(connection, Sequelize);
db.Guild = Guild(connection, Sequelize);
db.GuildMembers = GuildMembers(connection, Sequelize);
db.UserAvatarEquipped = UserAvatarEquipped(connection, Sequelize);
db.UserAvatars = UserAvatars(connection, Sequelize);
db.UserEvents = UserEvents(connection, Sequelize);
db.UserPrix = UserPrix(connection, Sequelize);
db.UserRelationship = UserRelationship(connection, Sequelize);
db.Avatar = Avatar(connection, Sequelize);

export {
	db,
	connection
}
