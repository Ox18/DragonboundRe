import { ControllerManager } from "../../lib/modules/controller-manager.module";

type Login = {
  t: string;
  u: string;
  p: string;
}

const controller = ControllerManager.rest<Login>()
  .handle(async (req) => {
    console.log(req.data.p)
    return [0, 0, 0, 1, 1];
  })
  .routes("/f.php")
  .methods(["POST"]);

export default controller;
