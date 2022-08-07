import { SERVER_OPCODE } from "./consts/server_opcode";
import { SERVER_TYPE } from "./consts/server_type";
import { Subject } from "./libraries/observer/Subject";
import { LOCATION } from "./consts";
import { ClientCriteria } from "./domains/criterias/client.criteria";
import { ClientMapper } from "./domains/mappers/client.mapper";
import { Chat } from "./subjects/Chat";

export class Server extends Subject {
    ID = null;
    name = "";
    type = SERVER_TYPE.NORMAL;
    subtype = 0;
    port = 80;
    player_online = 0;
    max_player = 0;
    min_level = 0;
    max_level = 0;
    is_active = true;
    ws = null;
    chat = new Chat(this);

    constructor() {
        super();
        this.initialize();
    }

    initialize() {
    }

    subscribe(client) {
        this.observers.push(client);
        client.send([SERVER_OPCODE.HI, 133, this.name, this.type, this.subtype]);
    }

    isFull() {
        return this.player_online >= this.max_player;
    }

    refreshChannelPlayers() {
        const clients = ClientCriteria.location(this.observers, LOCATION.CHANNEL);

        clients.forEach(client => {
            const clientMapper = ClientMapper.create(this.observers);
            client.send([SERVER_OPCODE.CHANNEL_PLAYERS, clientMapper.toChannelPlayer()]);
        });
    }
}