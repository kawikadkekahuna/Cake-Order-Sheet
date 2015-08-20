'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').Order;

router.get('/', function(req,res) {
	
	db.findAll().then(function(orders){
		console.log(orders);
  	res.json(orders);
	});

});


module.exports = router;