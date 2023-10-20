import { controller } from "../../lib/modules/controller-manager.module";

export default controller()
  .handle(async (request, res) => {

    request.session.destroy();

    res.json({})
  })
  .routes("/g.php")
  .methods(["POST"])