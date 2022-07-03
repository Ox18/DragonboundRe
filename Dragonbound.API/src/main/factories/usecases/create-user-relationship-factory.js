import { DbCreateUserRelationship } from "../../../data/usecases/db-create-user-relationship";
    import { User-relationshipRepository } from "@infra/db/sequelize/repositories/user-relationship-repository";
    
    export const makeDbCreateUserRelationship = () => {
        return new DbCreateUserRelationship(new User-relationshipRepository());
    }