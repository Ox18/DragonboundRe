import { controller } from "../../lib/modules/controller-manager.module";

export default controller()
  .handle(async (_request, res) => {
    res.json([1, 2]);
  })
  .routes("/my_username");
