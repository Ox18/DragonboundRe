var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([]));
});

router.get('/get_status', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var data = [1, 0, 0];
    res.send(JSON.stringify(data));
});

router.get('/session', function (req, res) {
    if (req.session.views) {
        req.session.views++;
        res.setHeader('Content-Type', 'text/html');
        res.write('<p>views: ' + req.session.views + '</p>');
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
        res.end();
    } else {
        req.session.views = 1;
        res.end('welcome to the session demo. refresh!');
    }
});

router.get('/d', function (req, res) {
    req.session.destroy();
    res.end('d');
});

module.exports = router;