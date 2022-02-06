class AccountHandler{
    constructor(connection, gameServer, gameServerId){
        this.connection = connection;
        this.gameServer = gameServer;
        this.gameServerId = gameServerId;
        this.initialize();
    }

    initialize(){
        this.connection.listen(message => {
            const opcode = message[0];
            const data = message.slice(1);
            this.Handler(opcode, data);
        });
    }

    Handler(opcode, data){
        throw new Error("Handler not implemented");
    }

    Emit(opcode, data){
        this.connection.send([opcode, ...data]);
    }

    Disconnect(){
        this.connection.close();
    }
}

export default AccountHandler;