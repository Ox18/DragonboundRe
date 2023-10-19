import { MainController } from "./main.controller";

export class TemplateController<T> extends MainController<T> {
  _templateName: string = "";

  constructor() {
    super();
  }

  templateName(templateName: string): TemplateController<T> {
    this._templateName = templateName;
    return this;
  }
}
