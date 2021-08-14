const ServerData = require('./data/server');

class ServerModel{
    static GetFetchData(){
        const { version, time, time_lapsed, servers } = ServerData;
        let data = [version, time, time_lapsed];
        servers.map((server)=>{
            const { name, type, port, playerOnline, playerLimit, isRestricted, minRank, maxRank } = server;
            let data_server = [name, type, port, playerOnline, playerLimit]; 
            if(isRestricted){
                data_server.push(minRank, maxRank);
            }
            data.push(data_server);
        });
        data.push(Date.now());
        return data;
    }
    static GetData(){
        return { ...ServerData };
    }
};

module.exports = ServerModel;