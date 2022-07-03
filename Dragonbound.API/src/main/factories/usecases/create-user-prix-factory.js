import { DbCreateUserPrix } from "../../../data/usecases/db-create-user-prix";
    import { User-prixRepository } from "@infra/db/sequelize/repositories/user-prix-repository";
    
    export const makeDbCreateUserPrix = () => {
        return new DbCreateUserPrix(new User-prixRepository());
    }