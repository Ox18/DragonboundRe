const mysql = require("mysql2");

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
}

export default DatabaseMySQL;