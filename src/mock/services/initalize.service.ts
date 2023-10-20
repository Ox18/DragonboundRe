import { initializeAccounts } from "./initialize-accounts.service";
import { initializeServers } from "./initialize-servers.service"
import { initializeUsers } from "./initialize-users.service";

export const initialize = async ()=> {
  await initializeServers();
  await initializeAccounts();
  await initializeUsers();
}