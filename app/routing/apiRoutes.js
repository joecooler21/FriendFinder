var express = require('express');
var path = require('path');
var router = express.Router();
var app = express();
var fs = require('fs');

router.route('/api/friends').get(function (req, res) {
    res.sendFile(path.join(__dirname, '../../app/data/friends-data.js'))


});

router.route('/api/friends').post(function (req, res) {
    let file = path.join(__dirname, '../../app/data/friends-data.js');

    //fs.appendFileSync(file, `[${JSON.stringify(req.body, null, 2)}]`, 'utf8');
    let data = fs.readFileSync(file, 'utf8');

    if (!data) {
        data = JSON.stringify(req.body, null, 2);
        fs.writeFileSync(file, data, 'utf8');
        return;
    } else {
        // load JSON into an array
        let json = JSON.parse(data);
        res.send(getMatch(req.body, json));
        // process friends data
        json.push(req.body);
        fs.writeFileSync(file, JSON.stringify(json, null, 2), 'utf8');
    }
});

function getMatch(userData, friendsData) {
    let results = [];
    var tmp = [];

    friendsData.forEach(root => {
        let i = 0;
        let r = 0;
        root.answers.forEach(e => {
            let diff = Number(userData.answers[i]) - Number(e);
            if (diff < 0) {
                diff = Number(e) - Number(userData.answers[i]);
            }
            tmp.push(diff);
            i++;
        });
        results.push(tmp);
        tmp = [];
        r++;
    });

    let reduced = [];

    results.forEach(r => {
        let reducer = (acc, cv) => acc + cv;
        reduced.push(r.reduce(reducer));
        
    });
    let index = reduced.indexOf(Math.min.apply(null, reduced));
    return (friendsData[index]);
}

router.route('/:any').get(function(req, res) {
    res.redirect('/');
});

module.exports = router;