import EventRepository from "../Repository/Event.repository";

class EventService{
    repo = new EventRepository();

    async findById(id){
        return this.repo.findById(id);
    }

    async findByQuery(params){
        return this.repo.findByQuery(params);
    }

    async findByUserId(user_id){
        return this.repo.findByUserId(user_id);
    }
}

export default EventService;