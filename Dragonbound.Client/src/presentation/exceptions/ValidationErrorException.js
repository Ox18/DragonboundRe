export class ValidationErrorException extends Error {
    constructor(errors) {
        super("ValidationError");
        this.errors = errors;
        this.name = "ValidationError";
    }
}