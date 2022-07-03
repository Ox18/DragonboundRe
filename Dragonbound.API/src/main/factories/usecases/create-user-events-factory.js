import { DbCreateUserEvents } from "../../../data/usecases/db-create-user-events";
    import { User-eventsRepository } from "@infra/db/sequelize/repositories/user-events-repository";
    
    export const makeDbCreateUserEvents = () => {
        return new DbCreateUserEvents(new User-eventsRepository());
    }