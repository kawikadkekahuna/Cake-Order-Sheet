'use strict';

var express = require('express');
var router = express.Router();
var preset_messages = require('../models').PresetMessage;
var message_colors = require('../models').MessageColor;
var orders = require('../models').Order;
var bodyParser = require('body-parser');

router.get('/all_orders', function (req, res) {
	orders.findAll().then(function (orders){
  		res.json(orders);
	});
});

router.post('/place_order', function (req, res) {

	

});

router.put('/edit_order', function (req, res) {

	

});

module.exports = router;