var express = require('express');
var path = require('path');
var htmlRoutes = require('./app/routing/htmlRoutes.js');
var apiRoutes = require('./app/routing/apiRoutes.js');
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', htmlRoutes);
app.use('/', apiRoutes);
app.use('/app/data', express.static(path.join(__dirname, '/app/data')));
var PORT = process.env.PORT ||  3000;

app.listen(PORT, function () {
    console.log(`Server running. Listening on port ${PORT}`);
});