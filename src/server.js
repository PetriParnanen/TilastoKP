var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require("express-session");
var mongoStore = require("connect-mongo")(session);
var User = require('./backend/models/user');

var config = require('./config');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//first login and register stuff, keep it in session
app.use(session({
    secret:"aBurningHouse",
    saveUnitialized:false,
    resave:true,
    cookie:{maxAge:1000*60*60*24},
    store:new mongoStore({
        collection:"session",
        url:"mongodb://localhost/sessionDb",
        ttl:24*60*60
    })
}));

app.post("/login", function(req,res){
    console.log("login");
    User.findOne({ "uname":req.body.uname }, function(err,user){
        if(err) {
            res.status(403).send({"Message":"No such user or password"});
        } else {
            if (user && req.body.pword == user.pword) { 
                req.session.logged = true;          
                res.status(200).json({"uname":user.uname, "token":"user123"});
            } else {
                res.status(403).send({"Message":"No such user or password"});
            }
        }
    });
});

app.post("/logout", function(req, res){
    console.log("logout");
    if(req.session){
        req.session.destroy();
        res.status(200).send({"Message":"Logout succesfull"});
    } else {
        res.status(404).send({"Message":"Failure"});
    }
});

app.post("/register", function(req,res){
    console.log(req.body);
    var temp = new User({
        "uname":req.body.uname,
        "pword":req.body.pword,
    });

    temp.save(function(err,item){
        if (err) {
            console.log(err);
            res.status(409);
            res.json({"Message":"Failure"});
        } else {
            res.json({"uname":item.uname, "id":item._id});
        }
    });
});

app.use("/api", function(req,res,next){
    if (req.headers.token == "user123"){
        req.session.params = req.headers;
        next();
    } else {
        res.status(403).send({"Message":"Not allowed"});
    }
});

// handles calls to api path
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