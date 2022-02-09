// import WebSocketServer from "./Libraries/WebSocketServer";

// WebSocketServer
// .instanceFromPort(9001);

require("dotenv").config();

const mysql = require("mysql2");

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });


// pool.getConnection(function(err, conn){

// });

const con = mysql.createConnection(
    {
        host: "db4free.net",
        user: "lnferno",
        password:".zSv43'jeRux998",
        database: "socialboundb"
    }
);

con.query("SELECT * FROM account", function(err, result, fields){
    if(err){
        console.log(err);
    }
    console.log(result);
}
);