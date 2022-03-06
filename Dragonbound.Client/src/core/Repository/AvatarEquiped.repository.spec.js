import AvatarEquipedRepository from "./AvatarEquiped.repository";


describe("AvatarEquiped repository", ()=>{
    test("find one user by id success", async ()=>{
        const repo = new AvatarEquipedRepository();

        const userId = 1;

        const avatarEquiped = await repo.findOneByUserId(userId);
        expect(avatarEquiped.user_id).toBe(userId);
    })

    test("find one user by id fail", async ()=>{
        const repo = new AvatarEquipedRepository();

        const userId = 100;

        try{
            const avatarEquiped = await repo.findOneByUserId(userId);
            expect(avatarEquiped.user_id).toBe(userId);
        }catch(e){
            expect(e.message).toBe("AvatarEquiped not found");
        }
    })
});