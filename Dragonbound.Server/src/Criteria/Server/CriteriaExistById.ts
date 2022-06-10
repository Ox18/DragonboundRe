import Server from "../../Server";

class CriteriaExistByIdServer{
    public static meet(servers: Array<Server>, id: number): boolean{
        return servers.some(server => server.id === id);
    }
}

export default CriteriaExistByIdServer;