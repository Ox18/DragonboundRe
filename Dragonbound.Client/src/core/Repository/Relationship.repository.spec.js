import RelationShipRepository from "./Relationship.repository";

describe("relationship repository", ()=>{
    test("find relationship by user id success", async()=>{
        const repo = new RelationShipRepository();

        const userId = 1;

        const relationship = await repo.findByUserId(userId);

        expect(relationship.user_id).toBe(userId);
    })

    test("find relationship by user id fail", async ()=>{
        const repo = new RelationShipRepository();

        const userId = 100;

        try{
            const relationship = await repo.findByUserId(userId);
            expect(relationship.user_id).toBe(userId);
        }catch(e){
            expect(e.message).toBe("Relationship not found");
        }

    })

});