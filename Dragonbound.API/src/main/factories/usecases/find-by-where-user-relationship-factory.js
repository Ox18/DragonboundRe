import { DbFindByWhereUserRelationship } from "../../../data/usecases/db-find-by-where-user-relationship";
    import { User-relationshipRepository } from "@infra/db/sequelize/repositories/user-relationship-repository";
    
    export const makeDbFindByWhereUserRelationship = () => {
        return new DbFindByWhereUserRelationship(new User-relationshipRepository());
    }