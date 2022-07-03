import { DbDeleteUserEvents } from "../../../data/usecases/db-delete-user-events";
    import { User-eventsRepository } from "@infra/db/sequelize/repositories/user-events-repository";
    
    export const makeDbDeleteUserEvents = () => {
        return new DbDeleteUserEvents(new User-eventsRepository());
    }