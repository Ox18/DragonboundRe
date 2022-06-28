export class ServerError extends Error {
    constructor(stack) {
        super("Internal server error");
        this.name = "ServerError";
        this.stack = stack;
    }
}