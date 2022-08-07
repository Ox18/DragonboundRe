import session from "express-session";
import MySQLStore from "express-mysql-session";
import ENV from "../config/env";

var options = {
    host: ENV.db.host,
    port: ENV.db.port,
    user: ENV.db.user,
    password: ENV.db.password,
    database: ENV.db.database,
    schema: {
        tableName: "account_sessions",
        columnNames: {
            session_id: "session_id",
            expires: "expires_time",
            data: "data_acc",
        },
    }
};

var mysqlStore = MySQLStore(session);
var sessionStore = new mysqlStore(options);

export default session({
    key: "sessionid",
    secret: "abc-xgamedev",
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: new Date(Date.now() + 60 * 1000 * 10),
    },
})