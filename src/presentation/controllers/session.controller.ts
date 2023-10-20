import { controller } from "../../lib/modules/controller-manager.module";

type CreateUser = {
  username: string;
  password: string;
};

export default controller<CreateUser>()
  .handle(async (req, res) => {
    res.json([0, 0, 0, 1, 1]);
  })
  .routes("/s.php");
