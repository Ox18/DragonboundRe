export class DbFindAllAvatar {
    constructor(
        repository
    ) {
        this.repository = repository;
    }   

    async findAll() {
        const response = await this.repository.findAll(...arguments);
        return response;
    }
}
        
        