import { ok } from "../helpers/http-helper";

export class OnlineServersController {
    constructor(
        findAllArrayServers
    ) {
        this.findAllArrayServers = findAllArrayServers;
    }


    async handle() {
        try {
            const response = await this.findAllArrayServers.findAllArray();

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