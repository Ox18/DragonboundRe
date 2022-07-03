import { DbFindByWhereUserPrix } from "../../../data/usecases/db-find-by-where-user-prix";
    import { User-prixRepository } from "@infra/db/sequelize/repositories/user-prix-repository";
    
    export const makeDbFindByWhereUserPrix = () => {
        return new DbFindByWhereUserPrix(new User-prixRepository());
    }