import AccountRepository from "@/infraestructure/repository/account.repository";
import global from "../data/global.json";
import { GuildMemberRepository } from "@/infraestructure/repository/guild-member.repository";
import { GuildRepository } from "@/infraestructure/repository/guild.repository";
import { ItemEquippedRepository } from "@/infraestructure/repository/item-equipped.repository";
import { ItemInventoryRepository } from "@/infraestructure/repository/item-inventory.repository";
import { ServerRepository } from "@/infraestructure/repository/server.repository";
import { UserEventRepository } from "@/infraestructure/repository/user-event.repository";
import UserRepository from "@/infraestructure/repository/user.repository";
import { logManager } from "@/lib/modules/log-manager.module";


const logger = logManager("mock")

export const initialize = async () => {

  logger.mark("Initializing mock data");

  logger.mark("Deleting all data");
  await AccountRepository.deleteAll();
  await AccountRepository.bulk(global.account);

  await GuildMemberRepository.deleteAll();
  await GuildMemberRepository.bulk(global.guildMember);

  await GuildRepository.deleteAll();
  await GuildRepository.bulk(global.guild);

  await ItemEquippedRepository.deleteAll();
  await ItemEquippedRepository.bulk(global.itemEquipped);

  await ItemInventoryRepository.deleteAll();
  await ItemInventoryRepository.bulk(global.itemInventory);

  await ServerRepository.deleteAll();
  await ServerRepository.bulk(global.server);

  await UserEventRepository.deleteAll();
  await UserEventRepository.bulk(global.userEvent);

  await UserRepository.deleteAll();
  await UserRepository.bulk(global.users);
  logger.mark("Mock data initialized");
};
