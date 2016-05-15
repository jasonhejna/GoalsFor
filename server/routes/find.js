var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
    res.send('Connection Established');
});

// UTIL FUNCTIONS

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function goalsToGame(goals){
    // convert goal json from the database to a format better suited to 1v1 matches
    // { place: ObjectId("570716f68e6b2a220a0528ea"), [ {g1: "Save the honeybees.", g2: "Send a human to Mars", vote: "g2"} ]

    goals = shuffle(goals);

    for (var i = 0; i < goals.length; i++) {
        if (i % 2 == 0){

        }
    }
}

// ROUTES



module.exports = router;