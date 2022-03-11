import UserRepository from "./User.repository";
import ParamNotValidException from "../Exception/ParamNotValidException";
import ResourceNotFoundException from "../Exception/ResourceNotFoundException";
// import User from "../Model/User";

const repo = new UserRepository();

describe("Test User Repository", ()=>{
    it("capture exception by param", async ()=>{
        await expect(repo.findByAccountId(0)).rejects.toThrow(ParamNotValidException);
    })

    it("not exist user by account_id", async ()=>{
        const accountId = 9999999999;
        await expect(repo.findByAccountId(accountId)).rejects.toThrow(ResourceNotFoundException);
    });

    it("capture exception to find by id", async ()=>{
        await expect(repo.findById(0)).rejects.toThrow(ParamNotValidException);
    })

    it("not exist user by id", async ()=>{
        const id = 9999999999;
        await expect(repo.findById(id)).rejects.toThrow(ResourceNotFoundException);
    })

    // it("the structure is correct", async ()=>{
    //     const userId = 1;
    //     const user = await repo.findById(userId);
    //     expect(user).toBeInstanceOf(User);
    // })
});