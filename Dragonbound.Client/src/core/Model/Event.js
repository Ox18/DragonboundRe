import ModelLib from "../../Libraries/ModelLib";

class Event extends ModelLib{
    constructor(){
        super({
            id: "",
            user_id: 0,
            event1: 0,
            event2: 0
        })
    }
}

export default Event;