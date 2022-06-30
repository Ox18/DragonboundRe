import Server from "../../Server";

class CriteriaStartIdServer{
    public static meet(servers: Array<Server>, id: number): Array<Server>{
        return servers.filter(server => server.id === id);
    }
}

export default CriteriaStartIdServer;
