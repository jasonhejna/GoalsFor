var express = require('express');
var router = express.Router();

/* Base route. */
router.get('/', function(req, res, next) {
  res.send('GoalsFor API here');
});

module.exports = router;
