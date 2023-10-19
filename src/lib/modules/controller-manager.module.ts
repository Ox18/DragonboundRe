import { RestController } from "../controllers/rest.controller";
import { TemplateController } from "../controllers/template.controller";

export class ControllerManager {
  public static rest<T>(): RestController<T> {
    return new RestController<T>();
  }

  public static template<T>(): TemplateController<T> {
    return new TemplateController<T>();
  }
}