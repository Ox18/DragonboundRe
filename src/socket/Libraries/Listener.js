class Listener{
    constructor(account, data){
        this.account = account;
        this.initial_properties = data;
    }

    init(){
        let keys = Object.keys(this.props);
        for(let i = 0; i < keys.length; i++){
            this.props[keys[i]] = this.initial_properties[i];
        }
    }
}

export default Listener;