import ServerRepository from "./Server.repository";
import ParamNotValidException from "../Exception/ParamNotValidException";
import ResourceNotFoundException from "../Exception/ResourceNotFoundException";

const repo = new ServerRepository();

describe("Test Server Repository", ()=>{
    it("findById is not valid id", async ()=>{
       await expect(repo.findById(0)).rejects.toThrow(ParamNotValidException);
    });

    it("Resource not exist", async ()=>{
        const serverId = 3;
        await expect(repo.findById(serverId)).rejects.toThrow(ResourceNotFoundException);
    })
})