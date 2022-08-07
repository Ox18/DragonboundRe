export class ClientMapper {
    clients = [];

    static create(clients) {
        const clientMapper = new ClientMapper();
        clientMapper.clients = clients;
        return clientMapper;
    }

    toChannelPlayer() {
        const data = this.clients.map(client => [
            client.user_data.id,
            client.user_data.game_id,
            client.user_data.rank,
            ''
        ]);
        return [].concat(...data);
    }
}