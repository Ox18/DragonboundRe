export class HistoryCriteria {

    static fromChatGroupType(history, chat_group_type) {
        return history.filter(message => message.chat_group_type === chat_group_type);
    }

    static fromLocation(history, location) {
        return history.filter(message => message.from_location === location);
    }
}