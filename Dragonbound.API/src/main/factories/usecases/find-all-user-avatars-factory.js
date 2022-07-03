import { DbFindAllUserAvatars } from "../../../data/usecases/db-find-all-user-avatars";
    import { User-avatarsRepository } from "@infra/db/sequelize/repositories/user-avatars-repository";
    
    export const makeDbFindAllUserAvatars = () => {
        return new DbFindAllUserAvatars(new User-avatarsRepository());
    }