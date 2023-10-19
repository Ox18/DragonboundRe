import { RequestController } from "./request-controller.type";

export type RoutesController = string | string[];

export interface HandleController<T = any> {
  (request: RequestController<T>):
    | Promise<void>
    | void
    | Promise<Record<string, any>>
    | Record<string, any>;
}

export type MethodsController = ["GET" | "POST" | "PUT" | "DELETE" | "PATCH"];