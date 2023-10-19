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
  const configLoaded = getLoaded(configBuffer);

  return configLoaded as T;
};
