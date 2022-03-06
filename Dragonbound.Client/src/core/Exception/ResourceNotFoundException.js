class ResourceNotFoundException extends Error{
    constructor(id){
        super("Resource with " + id + " not found");
        this.name = "ResourceNotFound";
    }
}

export default ResourceNotFoundException;