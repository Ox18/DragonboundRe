import { LOCATION, CHAT } from "./consts";
import { CLIENT_OPCODE } from "./consts/client_opcode";
import { SERVER_OPCODE } from "./consts/server_opcode";
import { ClientMapper } from "./domains/mappers/client.mapper";
import { UserRepository } from "./infraestructure/db/repositories/user-repository";
import * as Message from "./libraries/message";
import { Packet } from "./libraries/packet";
import { AvatarRepository } from "./infraestructure/db/repositories/avatar-repository";

var Player = {
    user_id: 1,
    location_type: 1,
    room_number: 0,
    game_id: "Alex",
    rank: 26,
    gp: 100000,
    gold: 10000000,
    cash: 10000000,
    gender: "m",
    unlock: 100,
    head: 1,
    body: 2,
    eyes: 0,
    flag: 0,
    background: 0,
    foreground: 0,
    event1: Date.now(),
    event2: Date.now(),
    photo_url: "https://avatars.githubusercontent.com/u/73305665?v=4",
    guild: "DEV",
    guild_job: 1,
    name_changes: 4,
    power_user: 1,
    tournament: 1,
    plus10gp: 1,
    mobile_fox: 1,
    country: "PE",
    relationship_status: "m",
    relationship_with_id: 1,
    relationship_with_rank: 27,
    relationship_with_photo: "https://avatars.githubusercontent.com/u/73305665?v=4",
    relationship_with_name: "Alex",
    relationship_with_gender: "m",
    maps_pack: 1,
    prix_points: 100,
    megaphones: 1000,
    lucky_egg_sec_left: Date.now() + 1000,
    prix_points_type: 2,
    prix_points_reset_price: 1
}

const userRepository = UserRepository.create();
const avatarRepository = AvatarRepository.create();

export class Client {
    user_id = null;
    user_auth_key = null;
    user_data = {};
    location = LOCATION.CHANNEL;
    chat_group_type = CHAT.GROUP.GLOBAL;

    constructor(connection, server) {
        this.connection = connection;
        this.server = server;
        this.connection.on("message", this.onMessage.bind(this));
        this.connection.on("close", this.close.bind(this));
    }

    onMessage(data) {
        const [OPCODE, ...DATA] = Packet.DecodeBuffer(data);

        switch (OPCODE) {
            case CLIENT_OPCODE.login:
                this.onLogin(DATA);
                break;
            case CLIENT_OPCODE.chat:
                this.onChat(DATA);
                break;
            case CLIENT_OPCODE.tab:
                this.onTab(DATA);
                break;
            case CLIENT_OPCODE.change_lobby_channel:
                this.onChangeLobbyChannel(DATA);
                break;
            case CLIENT_OPCODE.get_avatar:
                this.onGetAvatar(DATA);
                break;
            default:
                console.log("unknown", OPCODE, DATA);
                break;
        }
    }

    async onChangeLobbyChannel([chat_group_type]) {
        this.server.chat.changeChatLobbyChannel(this.user_id, chat_group_type);
        this.server.chat.loadHistoryFromChatGroupType(this.user_id, chat_group_type);
    }

    async onLogin(data) {
        const [user_auth_key, user_id] = data;
        this.user_id = user_id;
        this.user_auth_key = user_auth_key;

        const user_data = await userRepository.findOne({ id: user_id });

        if (!user_data) {
            this.close();
            return;
        }

        this.user_data = user_data;
        this.send(Message.LoginProfile());
        this.send(Message.LoginAvatars());
        this.send([SERVER_OPCODE.MY_PLAYER_INFO, Object.values({ ...Player, ...user_data })]);
        this.server.refreshChannelPlayers();
    }

    onChat(data) {
        const [message] = data;

        this.server.chat.addMessage({
            message,
            rank: this.user_data.rank,
            game_id: this.user_data.game_id,
            chat_group_type: this.chat_group_type,
            from_location: this.location,
            type: 0
        });
    }

    onTab([tab_type]) {
        if (tab_type === 0) {
            const clientMapper = ClientMapper.create(this.server.observers);
            this.send([SERVER_OPCODE.CHANNEL_PLAYERS, clientMapper.toChannelPlayer()]);
        }
    }

    async onGetAvatar([avatar_id]) {
        const avatar = await avatarRepository.findOne({ id: avatar_id });

        if(avatar){
            const data_avatar = [avatar.type, avatar.filename, avatar.animation];
            this.send([SERVER_OPCODE.AVATAR_INFO, avatar_id, data_avatar]);
        }

    }

    close() {
        this.connection.close();
        this.server.unsubscribe(this);
        this.server.refreshChannelPlayers();
    }

    send(data) {
        this.connection.send(Packet.Encode(data));
    }
}