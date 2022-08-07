import { SERVER_OPCODE } from "../consts/server_opcode";
import { ClientCriteria } from "../domains/criterias/client.criteria";
import { HistoryCriteria } from "../domains/criterias/history.criteria";
import { HistoryMapper } from "../domains/mappers/history.mapper";

export class Chat {
    history = [];

    constructor(server) {
        this.server = server;
    }

    addMessage(message) {
        this.history.push(message);
        this.notify(message);
    }

    notify(message) {
        let clients = ClientCriteria.location(this.server.observers, message.from_location);
        clients = ClientCriteria.chatGroupType(clients, message.chat_group_type);
        clients.forEach(client => {
            client.send([SERVER_OPCODE.CHAT, message.message, message.game_id, message.type, message.rank]);
        });
    }

    changeChatLobbyChannel(user_id, to_chat_group_type) {
        const clients = ClientCriteria.userId(this.server.observers, user_id);
        clients.forEach(client => {
            client.send([SERVER_OPCODE.ROOM_STATE, [0, []], to_chat_group_type]);
        });
    }

    loadHistoryFromChatGroupType(user_id, from_chat_group_type) {

        const details_history = HistoryCriteria.fromChatGroupType(this.history, from_chat_group_type);
        const last_history = HistoryMapper.create(details_history);
        const clients = ClientCriteria.userId(this.server.observers, user_id);

        clients.forEach(client => {
            client.send([SERVER_OPCODE.ROOM_STATE, [0, last_history.toArrayChat()], from_chat_group_type]);
        });
    }
}