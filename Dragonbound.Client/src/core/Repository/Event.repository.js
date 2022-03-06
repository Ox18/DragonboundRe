import EventData from "../Network/data/EventData";
import ResourceNotFoundException from "../Exception/ResourceNotFoundException";

class EventRepository{
    findByUserId(userId){
        return new Promise(async (resolve, reject)=>{
            try{
                const events = await this.findByQuery({ user_id: userId });
                if(events.length > 0){
                    resolve(events[0]);
                }
                else{
                    reject(new ResourceNotFoundException("user_id: " + userId));
                }
            }catch(e){
                reject(e);
            }
        });
    }

    findById(id){
        return new Promise(async (resolve, reject)=>{
            try{
                const event = await this.findByQuery({ id });
                if(event.length > 0){
                    resolve(event[0]);
                }
                else{
                    reject(new ResourceNotFoundException("id: " + id));
                }
            }catch(e){
                reject(e);
            }
        });
    }

    findByQuery(querys){
        return new Promise((resolve, reject)=>{
            const keys = Object.keys(querys);

            try{
                const events = EventData.filter(event => {
                    let result = true;
                    keys.forEach(key => {
                        if(event[key] !== querys[key]){
                            result = false;
                        }
                    });
                    return result;
                }).map(event => event);
                resolve(events);
            }catch(ex){
                reject(ex);
            }
        });
    }
}

export default EventRepository;