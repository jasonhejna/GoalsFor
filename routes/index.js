var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/jquery.min.map', function(req, res, next) {
  //res.sendFile(path.join(__dirname, '../../public/bootstrap/js', 'jquery.min.map'));
  res.download('public/bootstrap/js/jquery.min.map');
});



module.exports = router;
