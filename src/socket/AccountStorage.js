import ModelLib from "../Libraries/ModelLib";

var schema = {
    list: []
}

class AccountStorage extends ModelLib{
    constructor(){
        super(schema);
    }

    add(account){
        this.list.push(account);
    }
};

export default AccountStorage;