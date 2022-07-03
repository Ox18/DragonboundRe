import { DbDeleteAvatar } from "../../../data/usecases/db-delete-avatar";
    import { AvatarRepository } from "@infra/db/sequelize/repositories/avatar-repository";
    
    export const makeDbDeleteAvatar = () => {
        return new DbDeleteAvatar(new AvatarRepository());
    }