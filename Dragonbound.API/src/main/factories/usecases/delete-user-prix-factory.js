import { DbDeleteUserPrix } from "../../../data/usecases/db-delete-user-prix";
    import { User-prixRepository } from "@infra/db/sequelize/repositories/user-prix-repository";
    
    export const makeDbDeleteUserPrix = () => {
        return new DbDeleteUserPrix(new User-prixRepository());
    }