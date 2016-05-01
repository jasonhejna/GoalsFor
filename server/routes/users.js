var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
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
