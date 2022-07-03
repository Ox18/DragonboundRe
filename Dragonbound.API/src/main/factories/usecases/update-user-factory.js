import { DbUpdateUser } from "../../../data/usecases/db-update-user";
    import { UserRepository } from "@infra/db/sequelize/repositories/user-repository";
    
    export const makeDbUpdateUser = () => {
        return new DbUpdateUser(new UserRepository());
    }