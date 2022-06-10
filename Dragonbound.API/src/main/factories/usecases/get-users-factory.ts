import { DbGetUsers } from "@/data/usecases/db-get-users";
import { UserMysqlRepository } from "@/infra/db";

export const makeDbGetUsers = (): DbGetUsers => {
	return new DbGetUsers(new UserMysqlRepository());
};
