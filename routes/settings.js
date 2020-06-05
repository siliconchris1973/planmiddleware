var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var fs = require('fs');
var configFile = './serverconfig.json'
// check if there is a configuration file for a server connection
// and if yes, use that to populate the server connection object
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

/* GET Settings page. */
router.get('/', function(req, res, next) {
    res.render('settings', { title: 'COMLINE T&A Middleware for PLAN', 
                            subtitle: 'Settings', 
                            sectiontitle: 'PLAN Server Connection data',
                            svrname: svrConnData.ServerName,
                            svraddress: svrConnData.ServerAddress,
                            svrport: svrConnData.ServerPort,
                            svrapiprefix: svrConnData.ServerApiPrefix,
                            errors: {}
                        }
            );
});

router.post('/', function (req, res) {
    res.render('settings', {
        title: 'COMLINE T&A Middleware for PLAN', 
                            subtitle: 'Settings', 
                            sectiontitle: 'PLAN Server Connection data',
                            svrname: req.body.svrname,
                            svraddress: req.body.svraddress,
                            svrport: req.body.svrport,
                            svrapiprefix: req.body.svrapiprefix
    });
    console.log(" Svr Name:       ", req.body.svrname);
    console.log(" Svr Address:    ", req.body.svraddress);
    console.log(" Svr Port:       ", req.body.svrport);
    console.log(" Svr API Prefix: ", req.body.svrapiprefix);
    
    // store the data in a file
    var svrConnection = {
        ServerName: req.body.svrname,
        ServerAddress: req.body.svraddress,
        ServerPort: req.body.svrport,
        ServerApiPrefix: req.body.svrapiprefix
    };

    var data = JSON.stringify(svrConnection);

    fs.writeFile(configFile, data, function (err) {
        if (err) {
            console.log('There has been an error saving your configuration data.');
            console.log(err.message);
            return;
        }
        console.log('Configuration saved successfully.')
    });
});

module.exports = router;
