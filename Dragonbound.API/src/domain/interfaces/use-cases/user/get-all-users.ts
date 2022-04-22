import { User } from "@entities/user";

export interface GetAllUsersUseCase {
	execute(): Promise<User[]>;
}
