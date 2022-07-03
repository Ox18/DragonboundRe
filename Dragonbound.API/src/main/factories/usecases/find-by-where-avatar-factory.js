import { DbFindByWhereAvatar } from "../../../data/usecases/db-find-by-where-avatar";
    import { AvatarRepository } from "@infra/db/sequelize/repositories/avatar-repository";
    
    export const makeDbFindByWhereAvatar = () => {
        return new DbFindByWhereAvatar(new AvatarRepository());
    }