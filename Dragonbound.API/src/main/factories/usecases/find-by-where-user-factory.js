import { DbFindByWhereUser } from "../../../data/usecases/db-find-by-where-user";
import { UserRepository } from "../../../infra/db/sequelize/repositories/user-repository";

export const makeDbFindByWhereUser = () => {
    return new DbFindByWhereUser(new UserRepository());
}