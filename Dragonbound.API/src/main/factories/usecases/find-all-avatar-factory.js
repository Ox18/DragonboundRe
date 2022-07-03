import { DbFindAllAvatar } from "../../../data/usecases/db-find-all-avatar";
    import { AvatarRepository } from "@infra/db/sequelize/repositories/avatar-repository";
    
    export const makeDbFindAllAvatar = () => {
        return new DbFindAllAvatar(new AvatarRepository());
    }