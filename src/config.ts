import { config as ConfigModule } from "./lib/modules/config.module";
import { ConfigData } from "./types/config";

export const config = ConfigModule<ConfigData>();