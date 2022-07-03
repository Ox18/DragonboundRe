import { DbFindByWhereAccount } from "../../../data/usecases/db-find-by-where-account";
    import { AccountRepository } from "@infra/db/sequelize/repositories/account-repository";
    
    export const makeDbFindByWhereAccount = () => {
        return new DbFindByWhereAccount(new AccountRepository());
    }