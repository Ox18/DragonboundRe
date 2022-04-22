import { Request } from "supertest";
import { User } from "@entities/user";
import { CreateUserUseCase } from "@interfaces/use-cases/user/create-user";
import { GetAllUsersUseCase } from "@interfaces/use-cases/user/get-all-users";
import UserRouter from "@routers/user-router";
import server from "../../../src/server";

class MockGetAllUsersUseCase implements GetAllUsersUseCase {
	execute(): Promise<User[]> {
		throw new Error("Method not implemented.");
	}
}

class MockCreateUserUseCase implements CreateUserUseCase {
	execute(user: User): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
}

describe("User router", ()=>{
    let mockGetAllUsersUseCase: GetAllUsersUseCase;
    let mockCreateUserUseCase: CreateUserUseCase;

    beforeAll(()=>{
        mockGetAllUsersUseCase = new MockGetAllUsersUseCase();
        mockCreateUserUseCase = new MockCreateUserUseCase();
        // @ts-ignore
        server.use("/users", UserRouter(mockGetAllUsersUseCase, mockCreateUserUseCase));
    })

    beforeEach(()=>{
        jest.clearAllMocks();
    })
})