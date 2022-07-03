import { DbCreateServer } from "../../../data/usecases/db-create-server";
    import { ServerRepository } from "@infra/db/sequelize/repositories/server-repository";
    
    export const makeDbCreateServer = () => {
        return new DbCreateServer(new ServerRepository());
    }