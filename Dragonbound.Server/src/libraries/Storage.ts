class Storage<T>{
    constructor(
        public list: Array<T> = []
    ){}

    add(item: T){
        this.list.push(item);
        return this;
    }

    remove(item: T){
        this.list.splice(this.list.indexOf(item), 1);
        return this;
    }

    removeAll(){
        this.list = [];
        return this;
    }
}

export default Storage;