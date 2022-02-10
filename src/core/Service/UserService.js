import UserRepository from "../Repository/UserRepository";

class UserService{
    repo = new UserRepository();

    async findByAccountId(account_id){
        return this.repo.findByAccountId(account_id);
    }
}

export default UserService;