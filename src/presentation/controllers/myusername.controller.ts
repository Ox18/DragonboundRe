import { rest } from "../../lib/modules/controller-manager.module";

export default rest()
  .handle(async (_request) => {
    return [
      1,
      2
    ];
  })
  .routes("/my_username");