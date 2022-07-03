import { DbFindByWhereUserEvents } from "../../../data/usecases/db-find-by-where-user-events";
    import { User-eventsRepository } from "@infra/db/sequelize/repositories/user-events-repository";
    
    export const makeDbFindByWhereUserEvents = () => {
        return new DbFindByWhereUserEvents(new User-eventsRepository());
    }