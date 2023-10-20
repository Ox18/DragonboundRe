import { controller } from "../../lib/modules/controller-manager.module";
import accountRepository from "../../infraestructure/repository/account.repository";
import userRepository from "@/infraestructure/repository/user.repository";

export default controller<any>()
  .handle(async (req, res) => {
    const { username, password } = req.data;

    const account = await accountRepository.signIn({ username, password });

    const user = await userRepository.getByAccount(account?._id);

    if (!account || !user) {
      return res.json(["Login failed", "The username or password is incorrect"]);
    }

    req.session.set("user", user._id);
    req.session.set("account", account._id);

    const totalPlayers = await userRepository.getTotal();

    return res.json([
      user._id,
      user.rank,
      totalPlayers,
      "xxxx",
      user.country,
    ])



    // [Case] >> Banned
    // return [
    //   "Uso de aimbot hack",  // reason
    //   new Date(),            // date until
    //   ""                     // not used
    // ];

    // [Case] >> Server open timer
    // return [
    //   12000,  // days in integers
    //   200,    // seconds
    //   19000,  // total players
    //   199     // my user id
    // ]

    // [Case] >> Login success
    // return [
    //   199,        // user_id
    //   24,         // rank
    //   10000,      // total players
    //   "xxxx",     // user_auth_key
    //   "PE"        // user_country
    // ]

    // [Case] >> Password needed too (Facebook login)
    // return [-5, 1]

    // [Case] >> Password change needed (Facebook login)
    // GM account reset password
    // return [-9]

    // [Case] >> Password change needed
    // return [-11]

    // [Case] >> Message
    // return [
    //   "Title",
    //   "Description",
    // ]
  })
  .routes("/f.php")
  .methods(["POST"]);
