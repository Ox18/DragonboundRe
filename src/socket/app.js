import WebSocketServer from "./Libraries/WebSocketServer";
import DatabaseNEDB from "../core/DB/DatabaseNEDB";



WebSocketServer
.instanceFromPort(9001);


// const db = DatabaseNEDB.instance("users");

// // db.db.insert({
// //     name: "test2",
// // }, function(err, newDoc){
// //     console.log(newDoc);
// // });

// // db.db.find({
// //     name: "test2"
// // }, function(err, docs){
// //     console.log(docs);
// // });