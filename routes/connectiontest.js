var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// check if there is a configuration file for a server connection
// and if yes, use that to populate the server connection object
var fs = require('fs');
var configFile = './serverconfig.json'
var mySvrObj = fs.readFileSync(configFile),
        svrConnData;
try{
    svrConnData = JSON.parse(mySvrObj);
    console.log("Connection data from file:");
    console.log(svrConnData);
} catch (err) {
    console.log('There has been an error parsing your JSON.')
    console.log(err);
}
var svrConnection = "http://"+svrConnData.ServerAddress+":"+svrConnData.ServerPort+svrConnData.ServerApiPrefix


/* GET Connection test page. */
router.get('/', function(req, res, next) {
    res.render('connectiontest', { title: 'COMLINE T&A Middleware for PLAN', 
                            subtitle: 'Connection Test', 
                            sectiontitle: 'PLAN Server Connection to test',
                            svrname: svrConnData.ServerName,
                            svrconn: svrConnection,
                            errors: {}
                        }
            );
});

router.post('/', function (req, res) {
    res.render('connectiontest', {
        title: 'COMLINE T&A Middleware for PLAN', 
                            subtitle: 'Connection Test', 
                            sectiontitle: 'PLAN Server Connection to test',
                            svrname: svrConnData.ServerName,
                            svrconn: svrConnection,
                            connTry: true,
                            connResult: "currently only mocked"
    });
});

module.exports = router;
