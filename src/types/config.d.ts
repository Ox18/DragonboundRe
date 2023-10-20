import { ConfigHealth } from "../lib/types/config-health.type";

type ConnectionModel = {
  connection: string;
}

export interface ConfigData extends ConfigHealth {
  database: {
    user: ConnectionModel;
    account: ConnectionModel;
    servers: ConnectionModel;
  };
  game: {
    version: number;
  }
}
