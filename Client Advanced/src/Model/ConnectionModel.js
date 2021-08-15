require("dotenv").config();

let mysql = require("mysql2/promise");
var Logger = require("../game/lib/logger");

module.exports = class Connection {
  constructor() {
    var self = this;
    this.connection = null;
    this.host = process.env.DB_HOST;
    this.user = process.env.DB_USER;
    this.password = process.env.DB_PASSWORD;
    this.database = process.env.DB_DATABASE;
    this.connectionLimit = process.env.DB_CONNECTION_LIMIT; 
    this.connection = mysql.createPool({
      connectionLimit: self.connectionLimit,
      host: self.host,
      user: self.user,
      password: self.password,
      database: self.database,
    });
    if (this.connection !== null) {
      Logger.normal("MYSQL Connected!");
    }else{
      Logger.error("Ups... not connected MYSQL!"); 
    }
  }
};
