import { DbFindAllArrayServer } from "../../../data/usecases/db-find-all-array-server";
import { ServerRepository } from "../../../infra/db/sequelize/repositories/server-repository";

export const makeDbFindAllArrayServer = () => {
    return new DbFindAllArrayServer(new ServerRepository());
}