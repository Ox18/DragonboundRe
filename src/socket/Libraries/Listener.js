class Listener{
    constructor(account, data){
        this.last_account = account;
        this.last_initial_data = data;
    }

    init(){ 
        this.account = this.last_account;
        this.initial_data = this.last_initial_data;
        delete this.last_account;
        delete this.last_initial_data;

        let keys = Object.keys(this.props);
        for(let i = 0; i < keys.length; i++){
            this.props[keys[i]] = this.initial_data[i];
        }
    }
}

export default Listener;