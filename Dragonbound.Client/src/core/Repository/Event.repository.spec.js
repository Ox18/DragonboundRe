import EventRepository from "./Event.repository";

describe("event repository", ()=>{
    test("find event by user id success", async()=>{
        const repo = new EventRepository();

        const userId = 1;

        const event = await repo.findByUserId(userId);

        expect(event.user_id).toBe(userId);
    });
        
    test("find event by user id fail", async ()=>{
        const repo = new EventRepository();

        const userId = 100;

        try{
            const event = await repo.findByUserId(userId);
            expect(event.user_id).toBe(userId);
        }catch(e){
            expect(e.message).toBe("Event not found");
        }
    });
});