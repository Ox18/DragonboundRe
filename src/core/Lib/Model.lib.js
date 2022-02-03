class ModelLib{
    constructor(...args){
        Object.assign(this, ...args);
    }

    _getProperties(){
        return Object.keys(this);
    }

    static fromObject(obj){
        let model = new this();
        model._getProperties().forEach(prop => {
            if(obj[prop]){
                model[prop] = obj[prop];
            }
        });
        return model; 
    }
    
    toHashMap(){
        let hashMap = {};
        this._getProperties().forEach(prop => {
            if(prop !== "id"){
                hashMap[prop] = this[prop];
            }
        });
        return hashMap;
    }
}

export default ModelLib;