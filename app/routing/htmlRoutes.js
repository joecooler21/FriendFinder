
var express = require('express');
var path = require('path');
var router = express.Router();

    router.route('/').get(function (req, res) {
        res.sendFile(path.resolve(__dirname, '../public/home.html'));
    });

    router.route('/survey').get(function (req, res) {
        res.sendFile(path.resolve(__dirname, '../public/survey.html'));
    });

    module.exports = router;