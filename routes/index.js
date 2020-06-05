var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'COMLINE T&A Middleware for PLAN', subtitle: 'Dashboard' });
});

module.exports = router;
