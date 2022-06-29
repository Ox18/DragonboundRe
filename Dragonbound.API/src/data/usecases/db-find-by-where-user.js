export class DbFindByWhereUser {
    constructor(
        UserRepository
    ) {
        this.UserRepository = UserRepository;
    }

    async findByWhere(where) {
        const response = await this.UserRepository.findByWhere(where);
        return response;
    }
}