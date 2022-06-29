export class DbCreateUser {
    constructor(
        UserRepository
    ) {
        this.UserRepository = UserRepository;
    }

    async create(user) {
        const response = await this.UserRepository.create(user);
        return response;
    }
}