var express = require('express'),
    router = express.Router();

var mysql = require('mysql');



router.get('/', function (req, res) {
    res.redirect('/');
});

function renderName(name){
    let rename = name;
    rename = mysql.escape(rename).replace("'", "").replace("'", "");
    rename = rename.toLowerCase();
    return rename;
}
function renderProperty(object){
    let reObject = {}
    let extractProperty = Object.entries(object);
    extractProperty.map((property)=>{
        let key = property[0];
        let value = property[1];
        reObject[key] = value;
    });
    return reObject;
}
router.get('/:game_id', async function (req, res) {
    const { game_id } = req.params;
    const name = renderName(game_id);
    try{
    const database = req.db;
    const data_user_sql = await database.getUserByGameId(name);
    const info_user = await data_user_sql;

    const property_user = renderProperty(info_user); 
    
    const data = {
        'user': property_user,
    }
    console.log(data)
    res.status(200).render('info', data);

    }
    catch(error){
        res.status(505).json({
            message: 'Sorry but user not exist!'
        })
    }

});

module.exports = router;
//database.getUserByGameId(game_id)