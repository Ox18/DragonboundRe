
import { Server } from "@/domain/models/server.model";
import serverModel from "../models/server.model";

export class ServerRepository {
  public static async getAll(): Promise<Server[]> {
    const servers = await serverModel.find({});

    return servers.map((server) => (server.toJSON()));
  }

  static async bulk(servers: any[]): Promise<void> {
    await serverModel.insertMany(servers);
  }

  static async deleteAll(): Promise<void> {
    await serverModel.deleteMany({});
  }
}
