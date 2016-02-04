var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res) {
	var name = req.params.name;
	//res.render('modules/' + name);
	res.send(name);
 });

router.get('/chat', function(req, res) {
	var name = req.params.name;
	//res.render('modules/' + name);
	res.send(name);
 });

module.exports = router;
