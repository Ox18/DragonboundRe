class Observable{
    observers: Array<any>;

    constructor(){
        this.observers = [];
    }

    subscribe(observer: any): void{
        this.observers.push(observer);
    }

    unsubscribe(c: any): void{
        this.observers = this.observers.filter(observer => observer instanceof c !== true);
    }

    nofify(model: any): void{
        this.observers.forEach(function(observer){
            observer.notify(model);
        });
    }
}

export default Observable;