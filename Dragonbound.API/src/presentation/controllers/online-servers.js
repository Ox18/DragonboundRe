import { ok } from "../helpers/http-helper";

export class OnlineServersController {
    constructor(
        findAllServers
    ) {
        this.findAllServers = findAllServers;
    }


    async handle() {
        try {
            const response = await this.findAllServers.findAll();

            return ok(
                [
                    133,
                    9022,
                    83276,
                    ...response,
                    Date.now()
                ]
            )
        } catch (ex) {
            return serverError(ex);
        }
    }
}