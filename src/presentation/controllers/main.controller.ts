import { controller } from "../../lib/modules/controller-manager.module";

export default controller()
  .handle(async (_request, res) => {
    res.render("pages/index");
  })
  .routes("/");
