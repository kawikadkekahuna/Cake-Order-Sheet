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

router.post('/complete',function(req,res){

	db.findOne({
		where:{
			id: req.body.id
		}
	}).then(function(order){
		order.updateAttributes({'completed':true}).then(function(orderData){
			res.json(orderData)
		});
	});

});

router.post('/incomplete',function(req,res){

	db.findOne({
		where:{
			id: req.body.id
		}
	}).then(function(order){
		order.updateAttributes({'completed':false}).then(function(orderData){
			res.json(orderData)
		});
	});

});


module.exports = router;