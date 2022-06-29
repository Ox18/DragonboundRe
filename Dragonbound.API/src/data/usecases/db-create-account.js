export class DbCreateAccount {
    constructor(
        AccountRepository
    ) {
        this.AccountRepository = AccountRepository;
    }

    async create(user) {
        const response = await this.AccountRepository.create(user);
        return response;
    }
}