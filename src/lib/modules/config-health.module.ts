
import { config } from "./config.module";
import { ConfigHealth } from "../types/config-health.type";
import { ConfigHealthException } from "../exceptions/config-health";

export const configHealth = (): ConfigHealth => {
  const configInitialized = config<{ service: ConfigHealth }>();

  if (!configInitialized.service) throw new ConfigHealthException();

  return configInitialized.service;
};
