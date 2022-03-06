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
        if(model.init){
            model.init();
        }
        return model; 
    }

    static fromProps({ data, ...args }){
        var model = new this();
        var keys = Object.keys(model.props);
        var lastKeys = [...keys];
        
        var index = 0;
        lastKeys.forEach(key => {
            model.props[key] = data[index];
            index++;
        });
        model.initial_data = data;
        
        let _obj_keys = Object.keys(args);
        _obj_keys.forEach(key => {
            model[key] = args[key];
        });

        model.init();
        return model;
    }

    /**
     * Method to get object properties but id property 
     * is excluded
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

    assignProps(props){
        this._getProperties().forEach(prop => {
            if(props[prop]){
                this[prop] = props[prop];
            }
        });
    }

    getPropertiesFromArray(array){
        let properties = {};
        array.forEach(prop => {
            properties[prop] = this[prop];
        }
        );
        return properties;
    }
}

export default ModelLib;