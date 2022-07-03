import { DbUpdateUserEvents } from "../../../data/usecases/db-update-user-events";
    import { User-eventsRepository } from "@infra/db/sequelize/repositories/user-events-repository";
    
    export const makeDbUpdateUserEvents = () => {
        return new DbUpdateUserEvents(new User-eventsRepository());
    }