import PrixUserRepository from "./PrixUser.repository";

describe("prix user repository", ()=>{
    test("find prix user by user id success", async()=>{
        const repo = new PrixUserRepository();

        const userId = 1;

        const prixUser = await repo.findByUserId(userId);

        expect(prixUser.user_id).toBe(userId);
    })

    test("find prix user by user id fail", async ()=>{
        const repo = new PrixUserRepository();

        const userId = 100;

        try{
            const prixUser = await repo.findByUserId(userId);
            expect(prixUser.user_id).toBe(userId);
        }catch(e){
            expect(e.message).toBe("PrixUser not found");
        }
    });
    
});