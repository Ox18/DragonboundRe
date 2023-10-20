import { RestController } from "../controllers/rest.controller";
import { TemplateController } from "../controllers/template.controller";

export function rest<T>(): RestController<T> {
  return new RestController<T>();
}

export function template<T>(): TemplateController<T> {
  return new TemplateController<T>();
}