import { DbFindAllAccount } from "../../../data/usecases/db-find-all-account";
    import { AccountRepository } from "@infra/db/sequelize/repositories/account-repository";
    
    export const makeDbFindAllAccount = () => {
        return new DbFindAllAccount(new AccountRepository());
    }