class AddClientListObserver{
    notify(model: any){
        console.log("Ha surgido un cambio y me han llamado soy: " + this.constructor.name);
    }
}

export default AddClientListObserver;