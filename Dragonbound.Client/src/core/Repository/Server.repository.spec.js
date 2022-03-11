import ServerRepository from "./Server.repository";
import ParamNotValidException from "../Exception/ParamNotValidException";
import ResourceNotFoundException from "../Exception/ResourceNotFoundException";
import Server from "../Model/Server";

const repo = new ServerRepository();

describe("Test Server Repository", ()=>{
    it("findById is not valid id", async ()=>{
       await expect(repo.findById(0)).rejects.toThrow(ParamNotValidException);
    });

    it("Resource not exist", async ()=>{
        const serverId = 3;
        await expect(repo.findById(serverId)).rejects.toThrow(ResourceNotFoundException);
    })

    it("The structure is correct", async ()=>{
        const serverId = 1;
        const server = await repo.findById(serverId);
        const keyClass = Object.keys(Server.fromHashMap({}));
        const keyServer = Object.keys(server);
        const json = JSON.stringify(keyClass);
        const jsonServer = JSON.stringify(keyServer);
        expect(json).toEqual(jsonServer);
    })
})