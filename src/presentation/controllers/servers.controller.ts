import { config } from "../../config";
import { controller } from "../../lib/modules/controller-manager.module";
import { ServerRepository } from "../../infraestructure/repository/server.repository";

export default controller()
  .handle(async (_request, res) => {
    const servers = await ServerRepository.getAll();
    
    const serversList = servers.map((server) => [
      server.name,
      server.ip,
      server.port,
      server.playersOnline,
      server.maxPlayers,
      server?.rank?.min ?? undefined,
      server?.rank?.max ?? undefined,
    ]);

    res.json([
      config.game.version,
      0, // not used
      0, // not used
      ...serversList,
    ]);
  })
  .routes("/w.php");
