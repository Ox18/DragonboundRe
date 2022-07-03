import { DbUpdateAvatar } from "../../../data/usecases/db-update-avatar";
    import { AvatarRepository } from "@infra/db/sequelize/repositories/avatar-repository";
    
    export const makeDbUpdateAvatar = () => {
        return new DbUpdateAvatar(new AvatarRepository());
    }