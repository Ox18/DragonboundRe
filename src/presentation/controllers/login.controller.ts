import { rest } from "../../lib/modules/controller-manager.module";
import { LoginFailException } from "../../exceptions/loginFail.exception";
import accountRepository from "../../infraestructure/repository/account.repository";

const controller = rest<any>()
  .handle(async (req) => {
    const { username, password } = req.data;

    const account = await accountRepository.signIn({ username, password });

    if (!account) {
      return [
        "Login failed",
        "The username or password is incorrect",
      ]
    }

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

export default controller;
