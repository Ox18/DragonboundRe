import { Server } from "../Server";
import { SERVER_TYPE } from "../consts/server_type";

export default class ServerBasic extends Server {
    constructor() {
        super();
    }

    initialize() {
        this.ID = 1;
        this.name = "Server 1";
        this.type = SERVER_TYPE.MEDIC;
        this.max_player = 1000;
    }
}