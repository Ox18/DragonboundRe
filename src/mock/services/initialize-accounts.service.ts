import { logManager } from "../../lib/modules/log-manager.module"
import accountsData from "../data/accounts.json"
import accountRepository from "../../infraestructure/repository/account.repository";

const logger = logManager("mock:initialize-accounts")

export const initializeAccounts = async () => {
    logger.mark("Initializing accounts...")
    logger.mark("Deleting all accounts...")
    await accountRepository.deleteAll();
    logger.mark("Creating accounts...")
    await accountRepository.bulk(accountsData);
    logger.mark("Accounts initialized!")
};
