export class DbFindByWhereServer {
    constructor(
        ServerRepository
    ) {
        this.ServerRepository = ServerRepository;
    }

    async findByWhere(where) {
        const response = await this.ServerRepository.findByWhere(where);
        return response;
    }
}