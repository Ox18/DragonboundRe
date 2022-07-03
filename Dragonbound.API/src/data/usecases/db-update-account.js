export class DbUpdateAccount {
    constructor(
        repository
    ) {
        this.repository = repository;
    }   

    async update() {
        const response = await this.repository.update(...arguments);
        return response;
    }
}
        
        