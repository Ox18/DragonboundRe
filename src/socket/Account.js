class Account{
    constructor(connection, gameServer, gameServerId){
        this.connection = connection;
        this.gameServer = gameServer;
        this.gameServerId = gameServerId;

        connection.listen(message => {
            console.log(message);
        })
    }
}

export default Account;