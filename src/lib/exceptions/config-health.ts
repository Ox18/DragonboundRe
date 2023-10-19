export class ConfigHealthException {
  constructor() {
    throw new Error(
      "Please, make a config initial called 'service' in config file. And add prop port and name"
    );
  }
}
