export class ClientCriteria {

    static location(clients, location) {
        return clients.filter(client => client.location === location);
    }

    static chatGroupType(clients, chat_group_type) {
        return clients.filter(client => client.chat_group_type === chat_group_type);
    }

    static userId(clients, user_id) {
        return clients.filter(client => client.user_id === user_id);
    }
}