export class HistoryMapper {
    chat = [];

    static create(
        chat
    ) {
        const historyMapper = new HistoryMapper();
        historyMapper.chat = chat;
        return historyMapper;
    }

    toArrayChat() {
        return this.chat.map(message => [message.message, message.game_id, message.type, message.rank]);
    }
}