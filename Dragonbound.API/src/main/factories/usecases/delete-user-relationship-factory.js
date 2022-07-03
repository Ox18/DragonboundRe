import { DbDeleteUserRelationship } from "../../../data/usecases/db-delete-user-relationship";
    import { User-relationshipRepository } from "@infra/db/sequelize/repositories/user-relationship-repository";
    
    export const makeDbDeleteUserRelationship = () => {
        return new DbDeleteUserRelationship(new User-relationshipRepository());
    }