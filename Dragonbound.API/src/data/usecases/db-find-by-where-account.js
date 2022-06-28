export class DbFindByWhereAccount {
    constructor(
        AccountRepository
    ) {
        this.AccountRepository = AccountRepository;
    }

    async findByWhere(where) {
        const response = await this.AccountRepository.findByWhere(where);
        return response;
    }
}