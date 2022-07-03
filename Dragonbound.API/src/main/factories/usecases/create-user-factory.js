import { DbCreateUser } from "../../../data/usecases/db-create-user";
    import { UserRepository } from "@infra/db/sequelize/repositories/user-repository";
    
    export const makeDbCreateUser = () => {
        return new DbCreateUser(new UserRepository());
    }