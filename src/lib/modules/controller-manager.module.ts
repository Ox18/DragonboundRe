import { RestController } from "../controllers/rest.controller";

export function controller<T>(): RestController<T> {
  return new RestController<T>();
}
