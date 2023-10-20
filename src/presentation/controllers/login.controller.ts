import { AccountModel } from "../../models/account.model";
import { rest } from "../../lib/modules/controller-manager.module";

type Login = {
  username: string;
  password: string;
};

const controller = rest<Login>()
  .handle(async (req) => {
    const { username, password } = req.data;

    const exist = await AccountModel.exists({ username });

    if (!exist) {
      await AccountModel.create({ username, password });
    }

    return [0, 0, 0, 1, 1];
  })
  .routes("/f.php")
  .methods(["POST"]);

export default controller;
