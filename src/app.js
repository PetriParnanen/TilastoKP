var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');

var app = express();

app.use(express.static(path.join(__dirname,"app")));
app.use(bodyParser.json());

module.exports = app;

app.listen(3001);
console.log("Started at port 3001");