import { initializeAccounts } from "./initialize-accounts.service";
import { initializeServers } from "./initialize-servers.service"

export const initialize = async ()=> {
  await initializeServers();
  await initializeAccounts();
}