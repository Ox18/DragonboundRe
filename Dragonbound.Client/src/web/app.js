import express from 'express';
import path from 'path';
import "express-async-errors";
import cors from 'cors';
import session from 'express-session';
import routes from "./routes";
import DatabaseMySQL from '../core/DB/DatabaseMySQL';

var queryParser = require('express-query-int');
var bodyParser = require('body-parser')
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(DatabaseMySQL.MySQLStoreOptions);
var app = express();

app.use(bodyParser.json());
app.use(queryParser());
app.set("trust proxy", true);
app.use(session({
    key: "sessionid",
    secret: "xfs-games",
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}));
app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("views", "./src/web/views");
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname + '/public')));
app.use(routes);
app.use(cors({ origin: true }));

app.use((err, req, res, next) => {
    return res.status(500).json({
        status: "error",
        message: "Internal server error: " + err.message
    });
});

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});