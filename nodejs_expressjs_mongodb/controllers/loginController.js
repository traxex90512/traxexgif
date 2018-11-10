
var request = require('request');
var uploadFile = require('./uploadFile');
var mongoose = require('mongoose');
var User = mongoose.model('user');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
}

module.exports.index = function(req, res){
    res.render('loginView', { title: 'Login' });
};

module.exports.login = function(req, res){
    var email = req.param('email', null);
    var password = req.param('password', null);
    var obj = new Object();
    User.find({email:email, password:password}, 
        function(err, list) {
            if(err){
                obj.msg = 'error!';
                obj.flag = 'failed';
            } else {
                obj.msg = 'Welcome!';
                obj.flag = 'Success';
            }
            res.end(JSON.stringify(obj));
        }
    );
};

module.exports.signup = function(req, res) {
    res.render('signView', { title: 'Signup' });
};

module.exports.register = function(req, res) {
    var username = req.param('username', null);
    var email = req.param('email', null);
    var password = req.param('password', null);
    var obj = new Object();
    User.find({email:email}, 
        function(err1, list) {
            if(err1) {
                obj.msg = 'db get list error!';
                obj.flag = 'failed';
                res.end(JSON.stringify(obj));
            } else if(list.length > 0) {
                obj.msg = 'email exist already!';
                obj.flag = 'failed';
                res.end(JSON.stringify(obj));
            } else {
                User.create({username:username, email:email, password:password, imgpath:''}, 
                    function(err2, user) {
                        if(err2) {
                            obj.msg = 'db creat error!';
                            obj.flag = 'failed';
                        } else {
                            obj.msg = 'Welcome Success!';
                            obj.flag = 'success';
                            //res.redirect('/ahaha');
                        }
                        res.end(JSON.stringify(obj));
                    }
                );
            }

        }
    );
};


module.exports.main = function(req, res){
    console.log('************************************************');
    var email = req.param('email', null);
    var password = req.param('password', null);
    res.render('main', { title: 'Welcome' });
};

module.exports.upload = function(req, res){
    var email = req.param('email', null);
    var path = "/uploads/" + email + "_" + req.headers['x-uploadedfilename'];
    uploadFile(req, path);
    
    User.update({email:email}, {$set:{imgpath:path}}, function(err) {
        if(err) {
            throw err;
        }
    });
}