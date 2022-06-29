import { DbFindAllServer } from "../../../data/usecases/db-find-all-server";
import { ServerRepository } from "../../../infra/db/sequelize/repositories/server-repository";

export const makeDbFindAllServer = () => {
    return new DbFindAllServer(new ServerRepository());
}