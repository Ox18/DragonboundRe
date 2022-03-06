import UserRepository from "./User.repository";

describe("User repository", ()=>{
    test("find user by account id success", async ()=>{
        const repo = new UserRepository();

        const accountId = 1;

        const user = await repo.findByAccountId(accountId);

        expect(user.account_id).toBe(accountId);
    })

    test("find user by account id fail", async ()=>{
        const repo = new UserRepository();

        const accountId = 100;

        try{
            const user = await repo.findByAccountId(accountId);
            expect(user.account_id).toBe(accountId);
        }catch(e){
            expect(e.message).toBe("User not found");
        }
    })

});