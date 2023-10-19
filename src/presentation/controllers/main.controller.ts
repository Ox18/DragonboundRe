import { ControllerManager } from "../../lib/modules/controller-manager.module";

export default ControllerManager.template()
  .templateName("pages/index")
  .handle(async (request) => {
    return {};
  })
  .routes("/");
