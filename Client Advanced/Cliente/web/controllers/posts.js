var express = require('express'),
  router = express.Router();
var mysql = require('mysql');
var Logger = require('../../Controller/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');
var auth = require('../middlewares/auth');
var csrf = require('csurf');
var csrfProtection = csrf({
  cookie: true
});
router.get('/', function(req, res) {
  res.redirect('/');
});
router.post('/', function(req, res) {
  var cont = true;
  var id_page = req.body.UserPage;
  var texto = req.body.text;
  var date = Math.round(Date.now() / 1000);
  var acc_id = req.session.account_id;
  var session_inicied = req.session.acc_session ? true : false;

  switch (req.body.action) {
    case 'post':
      let post_long = texto.length <= 2000;
      if (session_inicied) {
        if (post_long) {
          req.db.putPosts(acc_id, id_page, texto, date).then(function(resb) {
            res.redirect(req.header('Referer'));
          }).catch(function(err) {
            res.redirect('/');
          });
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          res.end('Post too long (max 2000). Click "Back" button to return to your post and make it shorter.');
        }
      } else {
        res.redirect(req.header('Referer'));
      }
      break;
    case 'comment':
      if (session_inicied) {
        let comment_long = texto.length <= 150;
        let PostID = req.body.PostID;
        if (comment_long) {
          req.db.putComment(PostID, acc_id, texto, date).then(function() {
            res.redirect(req.header('Referer'));
          }).catch(function() {
            res.redirect(req.header('Referer'));
          });
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          res.end('Comment is too long. Click Back to fix.');
        }
      } else {
        res.redirect(req.header('Referer'));
      }
      break;
    case 'deleteComment':
    if(session_inicied){
      let CommentID = req.body.CommentID;
      
      req.db.connection.getConnection()
      .then(conn=>{
        conn.query('SELECT * from user_post_comment where id = ?',[CommentID])
        .then((data)=>{
          let dataComment = data[0][0];
          let comment_postId = dataComment.post_id;
          
          conn.query('SELECT * from user_post where post_id = ?', [comment_postId])
          .then((data)=>{
              let data_post = data[0][0];
              let to = parseInt(data_post.user_para);
              let userProfile = to === acc_id;
              req.db.deletePostsByCommentID(CommentID, acc_id, userProfile).then(function() {
                res.redirect(req.header('Referer'));
              }).catch(function(err) {
                res.redirect(req.header('Referer'));
              });
          })
          .catch(()=>{
            res.redirect(req.header('Referer'));
          })
        })
        .catch(()=>{
          res.redirect(req.header('Referer'));
        })
      })
      .catch(()=>{
        res.redirect(req.header('Referer'));
      })
    }else{
      res.redirect(req.header('Referer'));
    }
      
      break;
    case 'delete':
    if(session_inicied){
      let PostID = parseInt(req.body.PostID);
      req.db.connection.getConnection()
      .then(conn =>{
        conn.query('SELECT * from user_post where post_id = ?',[PostID])
        .then((data)=>{
          let data_post = data[0][0];
          let to = parseInt(data_post.user_para);
          let userProfile = to === acc_id;


        req.db.deletePostsByID(PostID, acc_id, userProfile).
        then(function() {
          req.db.deleteCommentWithPost(PostID).then(function() {
            res.redirect(req.header('Referer'));
          }).catch(function() {
            res.redirect(req.header('Referer'));
          })
        }).catch(function() {
          res.redirect(req.header('Referer'));
        })
          

          res.redirect(req.header('Referer'));
        })
        .catch(()=>{
          res.redirect(req.header('Referer'));
        })
      })
      .catch(()=>{
        res.redirect(req.header('Referer'));
      })
    }else{
      res.redirect(req.header('Referer'));
    }
      


      break;
    default:
      res.redirect('/');
      break;
  };
});
module.exports = router;