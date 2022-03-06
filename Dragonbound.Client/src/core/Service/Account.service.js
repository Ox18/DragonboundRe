import AccountRepository from "../Repository/Account.repository";

class AccountService{
    repo = new AccountRepository();

    async findByUsernameAndPassword(username, password){
        return this.repo.findByUsernameAndPassword(username, password);
    }

    async findAll(){
        return this.repo.findAll();
    }

    async findById(id){
        return this.repo.findById(id);
    }
}

export default AccountService;