import net from "net"
import path from "path";
import express, { Express } from "express";
import { frameworkRouter } from "./framework-router.module";
import { MainController } from "../../controllers/main.controller";
import { frameworkEngine } from "./framework-engine.module";
import { logManager } from "../log-manager.module";
import { frameworkMiddleware } from "./framework-middlewares.module";
import { frameworkNoSleep } from "./framework-no-sleep.module";

const logger = logManager("application");

export class Framework {
  app: Express;

  constructor(private readonly port: number) {
    this.app = express();
  }

  initialize(dir: string): void {
    frameworkMiddleware(this.app)
    this.app.use(
      "/static",
      express.static(path.join(dir, "../resources/public"))
    );
    frameworkEngine(this);
  }

  loadControllers(controllers: MainController[]) {
    frameworkRouter(this.app, controllers);
  }

  start(): void {
    frameworkNoSleep()
    this.app.listen(this.port, () => {
      logger.info(`Server started at http://localhost:${this.port}`);
    });
  }
}
