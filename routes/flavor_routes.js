'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').Flavor;

router.get('/', function(req, res) {

	db.findAll().then(function(flavors) {
		console.log(orders);
		res.json(orders);
	});

});

module.exports = router;