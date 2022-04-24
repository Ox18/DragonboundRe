import { DbGetUsers } from "@/data/usecases/db-get-users";

export const makeDbGetUsers = (): DbGetUsers => {
	return new DbGetUsers();
};
