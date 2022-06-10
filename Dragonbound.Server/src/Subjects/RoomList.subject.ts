import Subject from "../libraries/Subject";
import Room from "../Room";

class RoomListSubject extends Subject<RoomListSubject>{
    clients: Array<Room> = [];

    constructor(){
        super();
    }
}

export default RoomListSubject;