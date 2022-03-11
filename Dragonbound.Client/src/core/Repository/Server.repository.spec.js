import ServerRepository from "./Server.repository";
import ParamNotValidException from "../Exception/ParamNotValidException";

const repo = new ServerRepository();

describe("Test Server Repository", ()=>{
    it("findById is not valid id", async ()=>{
       await expect(repo.findById(0)).rejects.toThrow(ParamNotValidException);
    });
})