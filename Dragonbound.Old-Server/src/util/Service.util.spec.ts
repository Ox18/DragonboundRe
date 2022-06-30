import ServiceUtil from "./Service.util";

describe("Service.util.ts", ()=>{
    it("test", async ()=>{
        const response = await ServiceUtil.getPokemon();
        console.log(response);
        expect(true).toBe(true);
    })
});