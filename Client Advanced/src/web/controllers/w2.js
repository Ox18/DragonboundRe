const ServerController = require("../../Controller/ServerController");
var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    req.session.touch();
    res.send(JSON.stringify(ServerController.GetFetchData()));
});



module.exports = router;

