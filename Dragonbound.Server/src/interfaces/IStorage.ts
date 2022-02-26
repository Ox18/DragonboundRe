export default interface IStorage<T>{
    get(id:string):T;
    getAll():T[];
    add(model:T):void;
    update(model:T):void;
}