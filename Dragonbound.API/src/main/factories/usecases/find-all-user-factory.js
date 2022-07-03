import { DbFindAllUser } from "../../../data/usecases/db-find-all-user";
    import { UserRepository } from "@infra/db/sequelize/repositories/user-repository";
    
    export const makeDbFindAllUser = () => {
        return new DbFindAllUser(new UserRepository());
    }