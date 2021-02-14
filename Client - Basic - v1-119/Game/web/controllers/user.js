var express = require('express'),
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../game/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');


router.get('/', function (req, res) {
    res.redirect('/');
});

router.get('/:game_id', async function (req, res) {
    let database = req.db;
    
    let { game_id } = req.params;
    game_id = mysql.escape(game_id).replace("'", "").replace("'", "");
    game_id = game_id.toLowerCase();
    let byteLengthBuffer = Buffer.byteLength(game_id, 'utf8');
    
    
    if(byteLengthBuffer < 30){
        try{
            const data = await database.getUserByGameId(game_id);
            res.status(200).render('info', data);
        }catch(error){
            res.status(505).json({
                message: error
            })
        }
        
    }
});

module.exports = router;
