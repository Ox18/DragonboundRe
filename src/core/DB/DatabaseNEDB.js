var Datastore = require("nedb");

class DatabaseNEDB{
    db;
    path = "src/core/Network/Data";

    constructor(collectionName){
        this.path += "/" + collectionName + ".json";
        this.db = new Datastore({ filename: this.path, autoload: true });

        this.db.loadDatabase(function(err){});
    }

    static instance(collectionName){
        return new DatabaseNEDB(collectionName);
    }
}

export default DatabaseNEDB;