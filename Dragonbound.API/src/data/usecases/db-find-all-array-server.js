export class DbFindAllArrayServer {
    constructor(
        ServerRepository
    ) {
        this.ServerRepository = ServerRepository;
    }

    async findAll() {
        const response = await this.ServerRepository.findAllArray();
        return response;
    }
}