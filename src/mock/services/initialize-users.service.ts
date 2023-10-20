import userRepository from "@/infraestructure/repository/user.repository"
import { logManager } from "../../lib/modules/log-manager.module"
import userData from "@/mock/data/users.json"

const logger = logManager("mock:initialize-users")


export const initializeUsers = async () => {
  logger.mark("Initializing users...")
  logger.mark("Deleting all users...")
  await userRepository.deleteAll();
  logger.mark("Creating users...")
  await userRepository.bulk(userData);
  logger.mark("Users initialized!")
}