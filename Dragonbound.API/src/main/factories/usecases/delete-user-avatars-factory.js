import { DbDeleteUserAvatars } from "../../../data/usecases/db-delete-user-avatars";
    import { User-avatarsRepository } from "@infra/db/sequelize/repositories/user-avatars-repository";
    
    export const makeDbDeleteUserAvatars = () => {
        return new DbDeleteUserAvatars(new User-avatarsRepository());
    }