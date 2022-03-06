import AccountRepository from "../Repository/Account.repository";

class AccountService{
    repo = new AccountRepository();

    async findByUsernameAndPassword(username, password){
        return this.repo.findByUsernameAndPassword(username, password);
    }
    
    async findById(id){
        return this.repo.findById(id);
    }

    async findByQuery(params){
        return this.repo.findByQuery(params);
    }
}

export default AccountService;