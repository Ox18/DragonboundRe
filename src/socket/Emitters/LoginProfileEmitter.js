class LoginProfileEmitter{
    code = 26;

    constructor(account){
        this.account = account;
    }

    static meet(account){
        return new LoginProfileEmitter(account);
    }

    Emit(){
        this.account.Emit(this.code, []);
    }
}

export { LoginProfileEmitter };