import { DbDeleteServer } from "../../../data/usecases/db-delete-server";
    import { ServerRepository } from "@infra/db/sequelize/repositories/server-repository";
    
    export const makeDbDeleteServer = () => {
        return new DbDeleteServer(new ServerRepository());
    }