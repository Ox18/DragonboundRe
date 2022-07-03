import { DbDeleteUser } from "../../../data/usecases/db-delete-user";
    import { UserRepository } from "@infra/db/sequelize/repositories/user-repository";
    
    export const makeDbDeleteUser = () => {
        return new DbDeleteUser(new UserRepository());
    }