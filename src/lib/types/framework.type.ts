import Express from "express";
import { MainController } from "../controllers/main.controller";

export type FrameworkAdapterControllerParams = {
  method: string;
  route: string;
  controller: MainController;
  router: Express;
}