var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var config = require('./config');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.use(function(req, res, next){
	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Pragma,Cache-Control,If-Modified-Since');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);
	console.log('some stuff');
	next();
});

router.get('/', function(req, res){
	res.json({message: 'Api here'});
});
//routes
// Sport
var sportRouter = require('./backend/routes/sportRouter');
router.use('/sportlist', sportRouter);
//team
var teamRouter = require('./backend/routes/teamRouter');
router.use('/teamlist', teamRouter);
//player
var playerRouter = require('./backend/routes/playerRouter');
router.use('/playerlist', playerRouter);
//match
var matchRouter = require('./backend/routes/matchRouter');
router.use('/matchlist', matchRouter);

app.use('/api', router);

// mongo up
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useMongoClient: true})
	.then(() => console.log("connection to db succesful"))
	.catch((err) => console.error(err));

// port and put api up
var port = config.serverPort;
app.listen(port);
console.log('Port is ' + port);