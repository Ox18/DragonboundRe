import IObserver from "./IObserver";

interface ISubject<T>{
    observers:  IObserver[];
    subscribe(observer:IObserver):void;
    unsubscribe(observer:IObserver):void;
    notify(model:T):void;
}

export default ISubject;