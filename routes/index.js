var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	db = req.connection;
		db.query('SELECT * FROM member', function(err, rows, fields) {
			if (!err)
				res.render('index', { title: 'Prakasa NodeJS', desc: 'Home - Node Express JS Prakasa <nedya@detik.com>', memberlist: rows } );
			else
				console.log(err);
		});
});

/* Module Post data over here */
router.post('/', function (req, res) {
	db = req.connection;

	/* Data Query To Insert With Node Express */
	data = {
		id: null,
		name: req.param('name'),
		address: req.param('address'),

	}

	db.query('INSERT INTO member SET ?', data, function (err, result) {
		if (!err)
			res.redirect('/');
		else
			console.log(err);
	});
});

/*router.get('/about', function(req, res, next) {
  res.render('index', { title: 'My About Node', desc: 'This is a template that is great for small businesses. It doesn\'t have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!' } );
});

router.get('/service', function(req, res, next) {
  res.render('index', { title: 'My Service Node', desc: 'This is a template that is great for small businesses. It doesn\'t have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!' } );
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'My Contact Node', desc: 'This is a template that is great for small businesses. It doesn\'t have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!' } );
});*/

module.exports = router;
