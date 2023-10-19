import { MainController } from "./main.controller";

export class RestController<T> extends MainController<T> {
  constructor() {
    super();
  }
}