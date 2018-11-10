var request = require('request');
var path = require('path');
var fs = require('fs');

var upload = function(req, path){
    var fileData = new Buffer(+req.headers['content-length']);
    var bufferOffset = 0;
    req.on('data', function(chunk) {
        chunk.copy(fileData, bufferOffset);
        bufferOffset += chunk.length;
    }).on('end', function() {
        var to = "public" + path;
        fs.writeFile(to, fileData, function(err) {
            if (err) { throw err; }
            console.log('Saved file to ' + to);
        });
    });
}

module.exports = upload;