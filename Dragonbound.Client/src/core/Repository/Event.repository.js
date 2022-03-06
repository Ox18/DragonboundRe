import EventData from "../Network/data/EventData";

class EventRepository{
    findByUserId(userId){
        return new Promise((resolve, reject)=>{
            const event = EventData.find(event => event.user_id === userId);
            if(event){
                resolve(event);
            }else{
                reject(new Error("Event not found"));
            }
        });
    }
}

export default EventRepository;