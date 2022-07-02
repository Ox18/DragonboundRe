import { ok, serverError } from "../helpers/http-helper";

export class OnlineServerItemController {
    constructor(
        findByWhereServer
    ) {
        this.findByWhereServer = findByWhereServer;
    }

    async handle({ params }) {
        try {
            const { id } = params;

            const response = await this.findByWhereServer.findByWhere({ id });

            if (response) {
                return ok(response);
            }

            return serverError('Server not found');
        } catch (ex) {
            return serverError(ex);
        }
    }
}