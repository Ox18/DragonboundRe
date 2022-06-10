const mysql = require("mysql2/promise");

class DatabaseMySQL{
    constructor(){
        this.connection = undefined;
        this.init();
    }

    static HOST = "db4free.net";
    static USER = "lnferno";
    static PASSWORD = ".zSv43'jeRux998";
    static DATABASE = "socialboundb";

    init(){
        this.connection = mysql.createConnection({
            host: DatabaseMySQL.HOST,
            user: DatabaseMySQL.USER,
            password: DatabaseMySQL.PASSWORD,
            database: DatabaseMySQL.DATABASE
        });
    }

    static MySQLStoreOptions = {
        host: DatabaseMySQL.HOST,
        port: 3306,
        user: DatabaseMySQL.USER,
        password: DatabaseMySQL.PASSWORD,
        database: DatabaseMySQL.DATABASE,
        schema: {
            tableName: "account_sessions",
            columnNames: {
                session_id: "session_id",
                expires: "expires",
                data: "data"
            }
        }
    }

    static instance(){
        return new DatabaseMySQL();
    }

    find(query, params = []){
        var self = this;
        return new Promise(async (resolve, reject) => {
            try{
                const response = await self.query(query, params);
                const data = response[0];
                resolve(data);
            }catch(ex){
                reject(ex);
            }
        });
    }

    query(query, params){
        var self = this;
        return new Promise(async (resolve, reject) => {
            try{
                const conn = await self.connection;
                const response = await conn.query(query, params);
                conn.end();
                resolve(response);
            }catch(err){
                reject(err);
            }
        });
    }
}

export default DatabaseMySQL;