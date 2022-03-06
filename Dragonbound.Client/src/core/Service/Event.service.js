import EventRepository from "../Repository/Event.repository";

class EventService{
    repo = new EventRepository();

    async findById(id){
        return this.repo.findById(id);
    }

    async findByQuery(querys){
        return this.repo.findByQuery(querys);
    }
}

export default EventService;