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


router.get('/login/:id', function(req, res, next) {
	db = req.connection; var id = req.params.id;
	data = {
		id: id,
	}

	db.query('SELECT * FROM member WHERE', data, function (err, result) {
		if (!err)
			rows
		else
			console.log(err);
	});
	req.session.email = 'prakasa@devetek.com';
	if (req.session.email) {
		res.setHeader('Content-Type', 'text/html')
		res.write('<p>User: ' + req.session.email + '</p>')
		res.write('<p>expires in: ' + (req.session.cookie.maxAge) + 's</p>')
		res.end()
	} else {
		req.session.email = 'raka_1904@yahoo.co.id'
		res.end('welcome to the session demo. refresh!')
	}
 });

router.get('/chat', function(req, res, next) {
	res.render('chat', { title: 'Prakasa NodeJS', desc: 'Home - Node Express JS Prakasa <nedya@detik.com>', user: req.session.email} );
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
