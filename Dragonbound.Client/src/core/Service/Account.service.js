import AccountRepository from "../Repository/Account.repository";

class AccountService{
    repo = new AccountRepository();

    async findByUsernameAndPassword(username, password){
        return this.repo.findByUsernameAndPassword(username, password);
    }
    
    async findById(id){
        return this.repo.findById(id);
    }

    async findByQuery(querys){
        return this.repo.findByQuery(querys);
    }
}

export default AccountService;