var express = require('express'),
   router = express.Router();

var mysql = require('mysql');
var Logger = require('../../Controller/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');
var auth = require('../middlewares/auth');
var csrf = require('csurf');
var csrfProtection = csrf(
{
   cookie: true
});

router.get('/', function(req, res)
{
   res.redirect('/');
});

router.post('/', function(req, res)
{
   var cont = true;
   var id_page = req.body.UserPage;
   var texto = req.body.text;
   var date = Math.round(Date.now() / 1000);
   var acc_id = req.session.account_id;

   switch (req.body.action)
   {
      case 'post':
         req.db.getUserByIdAcc(parseInt(id_page))
            .then(function(resb)
            {
               var rows = resb[0];
               req.db.putPosts(acc_id, id_page, texto, date)
                  .then(function(resb)
                  {

                     res.redirect(req.header('Referer'));

                  }).catch(function(err)
                  {
                     res.redirect('/');
                  });
            }).catch(function(err)
            {
               res.redirect('/');
            });
         break;
      case 'comment':
         req.db.connection.getConnection().then(conn =>
         {
            conn.query('INSERT into user_post_comment SET post_id = ?, user_id = ?, texto = ?, fecha = ?', [req.body.PostID, acc_id, texto, date])
               .then(() =>
               {
                  res.redirect(req.header('Referer'));
               })
               .catch(() =>
               {
                  res.redirect(req.header('Referer'));
               })
         });
         break;
      case 'deleteComment':
         console.log(req.body);
         req.db.deletePostsByCommentID(req.body.CommentID)
            .then(function()
            {
               res.redirect(req.header('Referer'));
            }).catch(function(err)
            {
               res.redirect('/');
            });
         break;
      case 'delete':
         req.db.connection.getConnection().then(conn =>
         {
            var acc_id = req.session.account_id;
            var post_id = parseInt(req.body.PostID);
            Logger.info('Post ID: ' + post_id + ' - UserID: ' + acc_id);
            conn.query('SELECT post_id, user_de, user_para, texto, fecha FROM user_post WHERE post_id = ?', [post_id])
               .then(rows4 =>
               {
                  conn.release();
                  if (rows4[0].length > 0)
                  {
                     var rows_x2 = rows4[0];
                     if (rows_x2[0].user_de == parseInt(acc_id) || rows_x2[0].user_para == parseInt(acc_id))
                     {
                        req.db.deletePostsByID(req.body.PostID)
                           .then(function()
                           {
                              
                                 /// delete comments
                                    conn.query('delete from user_post_comment where post_id = ?',[post_id])
                                    .then(()=>{
                                       conn.release();
                                       res.redirect(req.header('Referer'));
                                    })
                                    .catch(function(err){
                                       console.log("error");
                                       res.redirect(req.header('Referer'));
                                    });
                                 /// delete comments  
                           }).catch(function(err)
                           {
                              res.redirect('/');
                           });
                     }
                     else
                     {
                        res.send("not your page or your post");
                     }
                  }
                  else
                  {
                     res.send("No publication found.");
                  }
               });
         });
         break;
      default:
         res.redirect('/');
         break;
   };
});

module.exports = router;