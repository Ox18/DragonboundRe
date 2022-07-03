import { DbFindByWhereServer } from "../../../data/usecases/db-find-by-where-server";
    import { ServerRepository } from "@infra/db/sequelize/repositories/server-repository";
    
    export const makeDbFindByWhereServer = () => {
        return new DbFindByWhereServer(new ServerRepository());
    }