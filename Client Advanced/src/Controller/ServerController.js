const ServerModel = require("../Model/ServerModel");

class ServerController{
    static GetFetchData(){
        return ServerModel.GetFetchData();
    }
    static GetData(){
        return ServerModel.GetData();
    }
}

module.exports = ServerController;