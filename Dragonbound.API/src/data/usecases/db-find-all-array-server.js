export class DbFindAllArrayServer {
    constructor(
        ServerRepository
    ) {
        this.ServerRepository = ServerRepository;
    }

    async findAllArray() {
        const response = await this.ServerRepository.findAllArray();
        return response;
    }
}