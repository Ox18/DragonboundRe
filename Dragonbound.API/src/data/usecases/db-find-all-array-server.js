export class DbFindAllArrayServer {
    constructor(
        repository
    ) {
        this.repository = repository;
    }   

    async findAllArray() {
        const response = await this.repository.findAllArray(...arguments);
        return response;
    }
}
        
        