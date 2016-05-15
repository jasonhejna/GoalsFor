var express = require('express');
var router = express.Router();

var async = require('async');
var randomstring = require("randomstring");
var ObjectId = require('mongodb').ObjectID;

router.get('/', function(req, res, next) {
    res.send('Connection Established');
});




module.exports = router;