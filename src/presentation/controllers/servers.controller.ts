import { config } from "../../config";
import { rest } from "../../lib/modules/controller-manager.module";
import { ServerRepository } from "../../infraestructure/repository/server.repository";

export default rest()
  .handle(async (_request) => {
    const servers = await ServerRepository.getAll();

    const serversList = servers.map((server) => [
      server.name,
      server.ip,
      server.port,
      server.playersOnline,
      server.maxPlayers,
      server.rank.min ?? undefined,
      server.rank.max ?? undefined,
    ]);

    return [
      config.game.version,
      0, // not used
      0, // not used
      ...serversList,
    ];
  })
  .routes("/w.php");