import GuildMemberRepository from "./GuildMember.repository";

describe("guild member repository", ()=>{
    test("find guild member by user id success", async()=>{
        const repo = new GuildMemberRepository();

        const userId = 1;

        const guildMember = await repo.findByUserId(userId);

        expect(guildMember.user_id).toBe(userId);
    });

    test("find guild member by user id fail", async ()=>{
        const repo = new GuildMemberRepository();

        const userId = 100;

        try{
            const guildMember = await repo.findByUserId(userId);
            expect(guildMember.user_id).toBe(userId);
        }catch(e){
            expect(e.message).toBe("GuildMember not found");
        }
    });
    
});