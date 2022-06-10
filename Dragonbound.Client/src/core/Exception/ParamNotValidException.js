class ParamNotValidException extends Error{
    constructor(description){
        super("The param is not valid: " + description);
        this.name = "ParamNotValidException";
    }
}

export default ParamNotValidException;