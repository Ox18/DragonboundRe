const mysql = require("mysql2/promise");

class DatabaseMySQL{
    constructor(){
        this.host = "db4free.net";
        this.user = "lnferno";
        this.password = ".zSv43'jeRux998";
        this.database = "socialboundb";
        this.connection = undefined;
        this.init();
    }

    init(){
        this.connection = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });
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