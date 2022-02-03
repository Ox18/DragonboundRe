import ServerFakeData from "../Network/Data/servers.json";

class DatabaseMySQL{
    constructor(){
        this.servers = ServerFakeData; 
    }
}

export default DatabaseMySQL;