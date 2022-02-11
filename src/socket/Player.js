import ModelLib from "../Libraries/ModelLib";
import { CHANNEL_TYPE } from "../consts/CHANNEL_TYPE";

class Player extends ModelLib {
    constructor(data){
        super({
            location_channel: CHANNEL_TYPE.CHAT
        })
    }
}

export default Player;