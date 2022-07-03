import { DbUpdateServer } from "../../../data/usecases/db-update-server";
    import { ServerRepository } from "@infra/db/sequelize/repositories/server-repository";
    
    export const makeDbUpdateServer = () => {
        return new DbUpdateServer(new ServerRepository());
    }