'use strict';

var express = require('express');
var router = express.Router();
var cakeFlavorDB = require('../models').CakeFlavor;
var cakeSizeDB = require('../models').CakeSize;

router.get('/get_flavors', function(req, res) {

	cakeFlavorDB.findAll().then(function(flavors) {
		res.json(flavors);
	});

});

router.get('/get_sizes', function(req, res) {

	cakeSizeDB.findAll().then(function(size) {
		console.log('size',size);
		res.json(size);
	});

});

module.exports = router;