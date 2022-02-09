import AccountRepository from "../Repository/AccountRepository";

class AccountService{
    repo = new AccountRepository();

    async findByUsernameAndPassword(username, password){
        return this.repo.findByUsernameAndPassword(username, password);
    }

}

export default AccountService;