var express = require('express'),
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../Controller/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');
var first_error = '';

var auth = require('../middlewares/auth');
var csrf = require('csurf');
var csrfProtection = csrf({
    cookie: true
});

router.get('/', auth, csrfProtection, function (req, res) {
    var acc_id = req.session.game_id;
    req.db.getUserByGameId(acc_id)
        .then(function (resb) {
        var rows = resb[0];
        Logger.info('My Pasword: '+rows[0].Password);
        Logger.info('The password change web page is being used');
        res.render('password', {
            error_principal: '',
            error_secundario: '',
            error_terceario: '',
            csrfToken: req.csrfToken()
        });
    }).catch(function (err) {
        Logger.debug("Error Password: " + err.stack);
        res.redirect('/');
    });
});

router.post('/', function (req, res) {
    //var password_change = 'Anonymo';
    var acc_id = req.session.account_id;
    var game_id = req.session.game_id;
    var cont = true;
    var password_old = req.body.old_password;
    var password_new1 = req.body.new_password1;
    var password_new2 = req.body.new_password2;
    var second_mistake = '';
    var third_mistake = '';
    req.db.getUserByGameId(game_id)
        .then(function (resb) {
        var rows = resb[0];
        Logger.info('#2 My Pasword: '+rows[0].Password);
        var password_change = rows[0].Password;
        if (password_old !== password_change) {
            cont = false;
            second_mistake = '<ul class="errorlist"><li>Your old password was entered incorrectly. Please enter it again.</li></ul>';
        }
        
        if (password_old === '' || password_new1 === '' || password_new2 === '') {
            cont = false;
            second_mistake = '<ul class="errorlist"><li>This field is required.</li></ul>';
        }
        
        if (password_new1 !== password_new2) {
            cont = false;
            third_mistake = '<ul class="errorlist"><li>The two password fields didn'+"'"+'t match.</li></ul>';
        }
        
        if (password_new1.length > 45 || password_new2.length > 45) {
            cont = false;
            second_mistake = '<ul class="errorlist"><li>Tthe password can only have a maximum of 45 characters.</li></ul>';
        }
        
        if (ignoreCase.startsWith(password_new1, " ")) {
            cont = false;
            second_mistake = '<ul class="errorlist"><li>Unknown error.</li></ul>';
        }
        
        if (ignoreCase.endsWith(password_new1, " ")) {
            cont = false;
            second_mistake = '<ul class="errorlist"><li>Unknown error.</li></ul>';
        }
        
        if (ignoreCase.startsWith(password_new2, " ")) {
            cont = false;
            second_mistake = '<ul class="errorlist"><li>Unknown error.</li></ul>';
        }
        
        if (ignoreCase.endsWith(password_new2, " ")) {
            cont = false;
            second_mistake = '<ul class="errorlist"><li>Unknown error.</li></ul>';
        }
        
        if (cont) {
            try {
                req.db.updatePasswordByNameId(password_new1, acc_id)
                    .then(function (resb) {
                    Logger.info('El User: '+game_id+' Cambio su contraseña: '+password_new1);
                    res.redirect('/accounts/password/change/done');
                });
            } catch (e) {
                Logger.info('Update Password SQL Fallido. User: '+game_id);
                res.redirect(req.header('Referer'));
            }
        } else {
            res.render('password', {
                error_principal: '<p class="errornote">Please correct the errors below.</p>',
                error_secundario: second_mistake,
                error_terceario: third_mistake,
                csrfToken: 'GC2y7tOD-dPCNEfEez1mY-17taDDbErxswyM'
            });
        }
    }).catch(function (err) {
        Logger.debug("#2 Error Password: " + err.stack);
        res.redirect('/');
    });
});

module.exports = router;