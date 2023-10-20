import accountRepository from "@/infraestructure/repository/account.repository";
import { controller } from "../../lib/modules/controller-manager.module";
import userRepository from "@/infraestructure/repository/user.repository";

type CreateUser = {
  username: string;
  password: string;
};

export default controller<CreateUser>()
  .handle(async (req, res) => {
    
    if (!req.session.isActive) {
      return res.json(0);
    }

    const account = await accountRepository.getById(req.session.data.account);

    const user = await userRepository.getByAccount(account?._id);

    if (!account || !user) {
      return res.json(0);
    }

    return res.json([user._id, user.rank, 10000, "xxxx", user.country]);
  })
  .routes("/s.php");
