import IObserver from "../interfaces/IObserver";
import ISubject from "../interfaces/ISubject";

class Subject<T> implements ISubject<T>{
    constructor(
        public observers: IObserver[] = []
    ){}

    subscribe(observer: IObserver): void {
        this.observers.push(observer);
    }
    
    unsubscribe(observer: IObserver): void {
        this.observers = this.observers.filter(o => o !== observer);
    }
    
    notify(model: T): void {
        this.observers.forEach(o => o.notify(model));
    }
}

export default Subject;