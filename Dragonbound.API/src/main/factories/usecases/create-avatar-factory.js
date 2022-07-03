import { DbCreateAvatar } from "../../../data/usecases/db-create-avatar";
    import { AvatarRepository } from "@infra/db/sequelize/repositories/avatar-repository";
    
    export const makeDbCreateAvatar = () => {
        return new DbCreateAvatar(new AvatarRepository());
    }