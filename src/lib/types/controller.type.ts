import { Response } from "express";
import { RequestController } from "./request-controller.type";

export type RoutesController = string | string[];

export interface HandleController<T = any> {
  (request: RequestController<T>, response: Response): Promise<void> | Promise<any>;
}

export type MethodsController = ["GET" | "POST" | "PUT" | "DELETE" | "PATCH"];