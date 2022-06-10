import { DbCreateUser } from "@/data/usecases";
import { UserMysqlRepository } from "@/infra/db";

export const makeDbCreateUser = (): DbCreateUser => {
	return new DbCreateUser(new UserMysqlRepository());
};
