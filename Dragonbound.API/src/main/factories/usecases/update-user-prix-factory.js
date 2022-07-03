import { DbUpdateUserPrix } from "../../../data/usecases/db-update-user-prix";
    import { User-prixRepository } from "@infra/db/sequelize/repositories/user-prix-repository";
    
    export const makeDbUpdateUserPrix = () => {
        return new DbUpdateUserPrix(new User-prixRepository());
    }