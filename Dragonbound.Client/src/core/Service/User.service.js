import UserRepository from "../Repository/User.repository";

class UserService{
    repo = new UserRepository();

    async findByAccountId(account_id){
        return this.repo.findByAccountId(account_id);
    }

    async findById(id){
        return this.repo.findById(id);
    }
    
    async findByQuery(querys){
        return this.repo.findByQuery(querys);
    }
}

export default UserService;