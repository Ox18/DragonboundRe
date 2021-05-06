const BcmHandler = {
    GuessValidHave(player) {
        return player.megaphones > megaphones;
    },
    GuessLongValid(message){
        return message.lenght > 200;
    },
    ConvertExpressToText(message) {
        let newMessage = String(message);
        newMessage.replace("<", "").replace(">", "").replace("alert", "").replace("\\", "").replace("//","").replace("%","");
        return newMessage;
    }
}
module.exports = BcmHandler;