import Server from "../../core/Model/Server";

const server = Server.fromHashMap({
    name: "Ga"
})

console.log(server.toHashMap());

export const get = async (req, res) => {
    res.send('Hello World!');
}