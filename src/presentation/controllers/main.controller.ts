import { template } from "../../lib/modules/controller-manager.module";

export default template()
  .templateName("pages/index")
  .handle(async (_request) => {
    return {};
  })
  .routes("/");
