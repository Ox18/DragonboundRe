import { ConfigHealth } from "../lib/types/config-health.type";

type ConnectionModel = {
  connection: string;
  collection: string;
}

export interface ConfigData extends ConfigHealth {
  database: {
    user: ConnectionModel;
    account: ConnectionModel;
    servers: ConnectionModel;
    items: ConnectionModel;
    guild: ConnectionModel;
  };
  game: {
    version: number;
  }
}
