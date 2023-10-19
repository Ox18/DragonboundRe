import { ControllerManager } from "../../lib/modules/controller-manager.module";

type CreateUser = {
  username: string;
  password: string;
};

const controller = ControllerManager.rest<CreateUser>()
  .handle(async (request) => {

    return [
      29,
      20715,
      174967,
      ["High Ranks", "141.255.164.107", 9001, 857, 4000, 7, 23],
      ["Mid Ranks", "141.255.164.108", 9002, 2507, 4000, 7, 17],
      ["Beginners", "192.168.1.5", 9003, 1726, 4000, 0, 6],
      ["All", "141.255.164.108", 9004, 2502, 4000],
      ["All", "141.255.164.107", 9005, 3913, 4000],
      ["Bunge.", "141.255.164.108", 9006, 2237, 4000],
      ["All", "141.255.164.107", 9007, 1469, 4000],
      ["All", "141.255.164.108", 9008, 1650, 4000],
      ["Aduka.", "141.255.164.107", 9009, 329, 4000],
      ["Avatar On.", "141.255.164.108", 9010, 340, 4000],
      ["Avatar Off.", "141.255.164.107", 9011, 944, 4000],
      ["Guilds.", "141.255.164.108", 9012, 2, 1000],
    ];
  })
  .routes("/w.php");

export default controller;
