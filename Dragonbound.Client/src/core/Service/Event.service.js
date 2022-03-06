import EventRepository from "../Repository/Event.repository";

class EventService{
    repo = new EventRepository();

    async findById(id){
        return this.repo.findById(id);
    }
}

export default EventService;