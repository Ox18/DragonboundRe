import { DbFindByWhereUserAvatars } from "../../../data/usecases/db-find-by-where-user-avatars";
    import { User-avatarsRepository } from "@infra/db/sequelize/repositories/user-avatars-repository";
    
    export const makeDbFindByWhereUserAvatars = () => {
        return new DbFindByWhereUserAvatars(new User-avatarsRepository());
    }