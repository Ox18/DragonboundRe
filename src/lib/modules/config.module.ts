import { configReplacerSecret } from "./config-replacer-secret.module";

require('dotenv').config(); 
const yaml = require("js-yaml");
const fs = require("fs");

const path: string = "config.yaml";

const getBufferConfig = () => {
  return fs.readFileSync(path, "utf8");
};

const getLoaded = (buffer: any) => {
  return yaml.load(buffer);
};

export const config = <T>() => {
  const configBuffer = getBufferConfig();
  let configLoaded = getLoaded(configBuffer);

  configReplacerSecret(configLoaded);

  return configLoaded as T;
};
