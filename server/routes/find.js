var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
    var input = req.body;
    console.log(input.heart);
    var db = req.app.get('db');
    db.collection('RegionData').find().toArray(function(err, result) {
        if (err) {
            console.log('errrr');
            throw err;
        }
        console.log(result);
        res.send(result);
    });
});

module.exports = router;
