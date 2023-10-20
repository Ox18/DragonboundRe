import { configHealth } from "./modules/config-health.module";
import { Framework } from "./modules/framework/framework.module";
import { loadControllers } from "./modules/load-controllers.module";

export const application = async (dir: string): Promise<void> => {
  const config = configHealth();

  const controllers = await loadControllers(dir);
  
  const framework = new Framework(config.service.port);
  framework.initialize(dir);
  framework.loadControllers(controllers);
  framework.start();
};
