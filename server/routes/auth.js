var express = require('express');
var router = express.Router();

var async = require('async');
var randomstring = require("randomstring");
var ObjectId = require('mongodb').ObjectID;

router.get('/', function(req, res, next) {
    res.send('Connection Established');
});

router.get('/tempAuth', function(req, res, next){
    // make a new session for an un-authed user
    // accepts query string: "location" = ObjectId in the places collection
    // returns: "expires" = unix time stamp, "session" = random string, "id" = ObjectId in the tempAuth collection, "goals" = array of goals

    async.waterfall([
        // TODO: ip blacklist
        function(callback){
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var session = randomstring.generate(256);
            var expires = Date.now() + 259200000;

            var db = req.app.get('db');
            db.collection('tempAuth').insertOne(
                {
                    "session": session,
                    "expires": expires,
                    "ip": ip,
                    "goals": []
                },
                function(err, result) {
                    if (err) throw err;

                    callback(null, expires, session, result.ops[0]._id);
                }
            );

        }
    ], function (err, expires, session, id) {
        if (err) throw err;

        res.send({"expires": expires, "session": session, "id": id});
    });
});

router.get('/givePhone', function(req, res, next) {
    var db = req.app.get('db');
    db.collection('auth').insertOne(
        {
            "phone": 128729999,
            "goals": []
        },
        function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        }
    );
});

module.exports = router;
