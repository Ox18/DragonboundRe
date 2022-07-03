import { DbFindAllUserRelationship } from "../../../data/usecases/db-find-all-user-relationship";
    import { User-relationshipRepository } from "@infra/db/sequelize/repositories/user-relationship-repository";
    
    export const makeDbFindAllUserRelationship = () => {
        return new DbFindAllUserRelationship(new User-relationshipRepository());
    }