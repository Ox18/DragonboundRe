import ServerRepository from "./Server.repository";

describe("Server repository", ()=>{
    test("find all servers equals to 1", async ()=>{
        const repo = new ServerRepository();
        
        const servers = await repo.findAll();

        expect(servers.length).toBe(1);
    })

    test("find by querys equals to 1", async ()=>{
        const repo = new ServerRepository();

        const querys = {
            name: "Test Server"
        };

        const servers = await repo.findByQuery(querys);

        expect(servers.length).toBe(1);
    })
});