export class ClientsObservable {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(...args) {
        this.observers.forEach(obs => obs.update(...args));
    }
}