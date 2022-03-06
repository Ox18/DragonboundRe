import GuildRepository from "./Guild.repository";

describe("guild repository", ()=>{
    test("find guild by id success", async()=>{
        const repo = new GuildRepository();

        const id = 1;

        const guild = await repo.findById(id);
            
            expect(guild.id).toBe(id);
    });

    test("find guild by id fail", async ()=>{
        const repo = new GuildRepository();
            
            const id = 100;

            try{
                const guild = await repo.findById(id);
                expect(guild.id).toBe(id);
            }catch(e){
                expect(e.message).toBe("Guild not found");
            }
    });
});