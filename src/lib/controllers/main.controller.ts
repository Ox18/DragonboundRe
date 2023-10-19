import { HandleController, MethodsController, RoutesController } from "../types/controller.type";

export class MainController<T = any> {
  _routes: RoutesController = [];
  _handle: HandleController<T> | null = null;
  _methods?: MethodsController= ["GET"];

  constructor() {}

  routes(routes: RoutesController): MainController<T> {
    this._routes = routes;
    return this;
  }

  handle(handle: HandleController<T>): MainController<T> {
    this._handle = handle;
    return this;
  }

  methods(methods: MethodsController): MainController<T> {
    this._methods = methods;
    return this;
  }
}
