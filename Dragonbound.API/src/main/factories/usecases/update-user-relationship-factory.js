import { DbUpdateUserRelationship } from "../../../data/usecases/db-update-user-relationship";
    import { User-relationshipRepository } from "@infra/db/sequelize/repositories/user-relationship-repository";
    
    export const makeDbUpdateUserRelationship = () => {
        return new DbUpdateUserRelationship(new User-relationshipRepository());
    }