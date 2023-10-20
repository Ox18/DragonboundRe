import serverModel from "../../models/server.model";
import { Server } from "../../types/model";

export class ServerRepository {
  public static async getAll(): Promise<Server[]> {
    const servers = await serverModel.find({});

    return servers
  }
}
