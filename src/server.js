var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require("express-session");
var mongoStore = require("connect-mongo")(session);
var User = require('./backend/models/user');

//morgan is logging help. Logs all requests.
//var morgan = require('morgan');
//app.use(morgan('dev'));

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

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Pragma,Cache-Control,If-Modified-Since', 'token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.post("/login", function(req,res){
        console.log("login: "+req.body.username);
        if (req.body.username == null || req.body.username == '' || 
            req.body.password == null || req.body.password == ''){
            res.status(409).send({"Message": "DB.ERR.EMPTYUSERORPW"});
        } else {
            User.findOne({ "username":req.body.username }, function(err,user){
                if(err) {
                    res.status(404).send({"Message":"DB.ERR.DBERROR"});
                };

                if (!user){
                    res.status(403).send({"Message":"DB.ERR.NOUSER"});
                } else if (user) {
                    var validPasswd = user.checkPassword(req.body.password);
                    if (!validPasswd) {
                        res.status(403).send({"message":"DB.ERR.NOUSER"});
                    } else {
                        res.status(200).json({"uname":user.username, "token":"user123"});
                    }
                }
            });
        }
    });

app.post("/logout", function(req, res){
        console.log("logout");
        if(req.session){
            req.session.destroy();
            res.status(200).send({"message":"Logout succesfull"});
        } else {
            res.status(404).send({"message":"DB.ERR.FAILLOGOUT"});
        }
    });

app.post("/register", function(req,res){
        console.log("register: "+req.body.username);

        var temp = new User({
            "username":req.body.username,
            "password":req.body.password,
        });

        if (req.body.username == null || req.body.username == '' || 
            req.body.password == null || req.body.password == ''){
            res.status(409).send({"message": "DB.ERR.EMPTYUSERORPW"});
        } else {
            temp.save(function(err,item){
                if (err) {
                    console.log(err);
                    res.status(409).send({"message":"DB.ERR.DOUBLEUSER"});
                } else {
                    res.status(200).send({"username":item.username, "id":item._id});
                }
            });
        }
    });

// handles calls to api path
var router = express.Router();

router.use(function(req, res, next){

    //if (req.headers.token == "user123"){
    //    req.session.params = req.headers;
    //    next;
    //} else {
    //    res.status(403).send({"Message":"Not allowed"});
    //}

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
app.listen(port, function() {
    console.log('Port is ' + port);
});