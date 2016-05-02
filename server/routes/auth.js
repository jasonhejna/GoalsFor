var express = require('express');
var router = express.Router();

var async = require('async');
var randomstring = require("randomstring");
var ObjectId = require('mongodb').ObjectID;

router.get('/', function(req, res, next) {
    res.send('Connection Established');
});



router.get('/tempAuth', function(req, res, next){
    async.waterfall([
        function(callback){

            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var session = randomstring.generate(256);
            var expires = Date.now() + 259200000;

            var location = req.query.location;

            var db = req.app.get('db');
            db.collection('tempAuth').insertOne(
                {
                    "session": session,
                    "expires": expires,
                    "ip": ip
                },
                function(err, result) {
                    if (err) throw err;

                    callback(null, expires, session, result.ops[0]._id);
                }
            );

        },
        function(expires, session, dbid, callback){
            var db = req.app.get('db');
            db.collection('places').find({ "_id": ObjectId("570716f68e6b2a220a0528ea") }).toArray(function(err, result) {
                if (err) throw err;

                callback(null, expires, session, dbid, result[0].goals);
            });

        },
        function(expires, session, dbid, goals, callback){

            callback(null, expires, session, dbid, goals);
        }
    ], function (err, expires, session, dbid, goals) {
        if (err) throw err;

        res.send({"expires": expires, "session": session, "id": dbid, "goals": goals});
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
