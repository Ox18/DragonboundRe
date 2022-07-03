import { DbUpdateUserAvatars } from "../../../data/usecases/db-update-user-avatars";
    import { User-avatarsRepository } from "@infra/db/sequelize/repositories/user-avatars-repository";
    
    export const makeDbUpdateUserAvatars = () => {
        return new DbUpdateUserAvatars(new User-avatarsRepository());
    }