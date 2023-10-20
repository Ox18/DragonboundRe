import { logManager } from "../../lib/modules/log-manager.module"
import servers from "../data/servers.json"
import serverModel from "../../models/server.model"

const logger = logManager("mock:initialize-servers")

export const initializeServers = async () => {
  logger.mark("Initializing servers...")
  logger.mark("Deleting all servers...")
  await serverModel.deleteMany({})
  logger.mark("Creating servers...")
  await serverModel.create(servers)
  logger.mark("Servers initialized!")
}