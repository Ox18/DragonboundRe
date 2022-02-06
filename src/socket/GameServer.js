class GameServer{
    constructor(id, ws){
        this.id = id;
        this.ws = ws;
        this.ups = 50;
        this.outgoingQueues = {};
        
        this.onAccountConnect(function (account) {
            account.send([100, 10, "ga", 1, 2]);
        });
        this.initialize();
    }

    initialize(){
        this.run();
    }

    onAccountConnect(callback) {
        this.connect_callback = callback;
    }

    run(){
        var self = this;
        var regenCount = 100;
        var updateCount = 0;
        setInterval(function(){
            self.processQueues();

            if(updateCount < regenCount){
                updateCount++;
            }else{
                updateCount = 0;
            }
        }, 1000 / this.ups);
        console.log("GameServer " + this.id + " started");
    }

    processQueues(){
        var self = this, connection;
        for(var id in this.outgoingQueues){
            if(this.outgoingQueues[id].length > 0){

            }
        }
    }
}

export default GameServer;