import { DbCreateUser } from "@/data/usecases/db-create-user";

export const makeDbCreateUser = (): DbCreateUser => {
    return new DbCreateUser();
}