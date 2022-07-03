import { DbCreateUserAvatars } from "../../../data/usecases/db-create-user-avatars";
    import { User-avatarsRepository } from "@infra/db/sequelize/repositories/user-avatars-repository";
    
    export const makeDbCreateUserAvatars = () => {
        return new DbCreateUserAvatars(new User-avatarsRepository());
    }