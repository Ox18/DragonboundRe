import { AccountRepository } from "@infra/db/sequelize/repositories/account-repository";

var account = new AccountRepository();

describe("Account repository", () => {
    // // created
    // test("create account", async () => {
    //     try {
    //         const newAccount = await account.create({
    //             username: "testing",
    //             password: "testing",
    //         });

    //         expect(newAccount).toBeDefined();
    //     } catch (ex) {
    //         expect(ex).toBeUndefined();
    //     }
    // });

    //find by username and password
    test("find by username and password", async () => {
        const username = "testing";
        const password = "testing";

        const findAccount = await account.findByWhere({
            username,
            password
        });
        expect(findAccount).toBeDefined();
    });
})