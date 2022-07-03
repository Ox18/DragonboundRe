import { DbFindAllUserPrix } from "../../../data/usecases/db-find-all-user-prix";
    import { User-prixRepository } from "@infra/db/sequelize/repositories/user-prix-repository";
    
    export const makeDbFindAllUserPrix = () => {
        return new DbFindAllUserPrix(new User-prixRepository());
    }