export class DbFindAllServer {
    constructor(
        ServerRepository
    ) {
        this.ServerRepository = ServerRepository;
    }

    async findAll() {
        const response = await this.ServerRepository.findAll();
        return response;
    }
}