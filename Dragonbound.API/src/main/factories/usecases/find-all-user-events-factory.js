import { DbFindAllUserEvents } from "../../../data/usecases/db-find-all-user-events";
    import { User-eventsRepository } from "@infra/db/sequelize/repositories/user-events-repository";
    
    export const makeDbFindAllUserEvents = () => {
        return new DbFindAllUserEvents(new User-eventsRepository());
    }