var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email:      String,
    password:   String,
    username:   String,
    imgpath:    String
});

mongoose.model('user', userSchema);