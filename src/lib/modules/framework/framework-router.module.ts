import { Express } from "express";
import { frameworkAdapterController } from "./framework-adapter-controller.module";
import { MainController } from "@/lib/controllers/main.controller";
import { FrameworkAdapterControllerParams } from "@/lib/types/framework.type";

export const frameworkRouter = (
  app: Express,
  controllers: MainController<any>[]
) => {
  for (const controller of controllers) {
    const routes =
      typeof controller._routes === "string"
        ? [controller._routes]
        : controller._routes;

    for (const route of routes) {
      for (const method of controller._methods) {

        const adapterParams: FrameworkAdapterControllerParams = {
          controller,
          method: method.toLowerCase(),
          route,
          router: app,
        };
        
        frameworkAdapterController(adapterParams)
      }
    }
  }
};
