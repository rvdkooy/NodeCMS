var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home/index', { title: 'Express', layout: 'home/layout.ejs' });
});

module.exports = router;
