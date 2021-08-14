const ServerModel = require("../Model/ServerModel");

class ServerController{
    static GetFetchData(){
        return ServerModel.GetFetchData();
    }
}

module.exports = ServerController;