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