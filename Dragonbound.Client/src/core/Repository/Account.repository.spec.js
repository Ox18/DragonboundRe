import AccountRepository from "./Account.repository";

describe("Account repository", ()=>{

    test("exist account", async ()=>{
        const repo = new AccountRepository();

        const username = "admin";
        const password = "admin";

        const account = await repo.findByUsernameAndPassword(username, password);
        expect(account.username).toBe(username);
    });

    test("account not exist", async ()=>{
        const repo = new AccountRepository();

        const username = "admin";
        const password = "admin1";

        try{
            const account = await repo.findByUsernameAndPassword(username, password);
            expect(account.username).toBe(username);
        }catch(e){
            expect(e.message).toBe("Account not found");
        }
    });
});