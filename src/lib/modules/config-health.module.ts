
import { config } from "./config.module";
import { ConfigHealth } from "../types/config-health.type";
import { ConfigHealthException } from "../exceptions/config-health";

export const configHealth = (): ConfigHealth => {
  const configInitialized = config<ConfigHealth>();

  if (!configInitialized) throw new ConfigHealthException();

  return configInitialized;
};
