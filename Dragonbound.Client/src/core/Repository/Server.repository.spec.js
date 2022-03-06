import ServerRepository from "./Server.repository";

describe("Server repository", ()=>{
    test("find all servers equals to 1", async ()=>{
        const repo = new ServerRepository();
        
        const servers = await repo.findAll();

        expect(servers.length).toBe(1);
    })
});