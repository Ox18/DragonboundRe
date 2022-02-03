class ModelLib{
    constructor(...args){
        Object.assign(this, ...args);
    }

    /**
     * Method to get the properties of the model
     * @returns {Array}
     * @example
     * const model = {
     *   name: "John",
     *   age: 30
     * };
     * const properties = model._getProperties();
     * console.log(properties); // ["name", "age"]
     */
    _getProperties(){
        return Object.keys(this);
    }

    /**
     * Method to instantiate a model from a hashmap
     * @param {Object} obj Object to be compared
     * @returns Instance of ModelLib
     * @example
     * const model = {
     *  name: "John",
     *  age: 30
     * };
     * const modelLib = ModelLib.fromHashMap(model);
     * console.log(modelLib.name); // John
     */
    static fromHashMap(obj){
        let model = new this();
        model._getProperties().forEach(prop => {
            if(obj[prop]){
                model[prop] = obj[prop];
            }
        });
        return model; 
    }

    /**
     * Method to get object properties but id property is excluded
     * @returns {Object}
     */
    toHashMapToDatabase(){
        let hashMap = this.toHashMap();
        delete hashMap.id;
        return hashMap;
    }
    
    /**
     * Method to get object properties
     * @returns {Object}
     */
    toHashMap(){
        let hashMap = {};
        this._getProperties().forEach(prop => {
            hashMap[prop] = this[prop];
        });
        return hashMap;
    }
}

export default ModelLib;