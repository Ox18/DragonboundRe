import { User } from "@entities/user";

export interface CreateUserUseCase {
	execute(user: User): Promise<boolean>;
}
