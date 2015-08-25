'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').Order;
var bodyParser = require('body-parser');

router.get('/', function(req,res) {
	
	db.findAll().then(function(orders){
	console.log('ORDERS RECEIVED');
  	res.json(orders);
	});

});

router.post('/place_order', function(req,res) {
    // quantity: DataTypes.INTEGER,
    // size: DataTypes.STRING,
    // icecream_flavors: DataTypes.STRING,
    // cake_flavor: DataTypes.STRING,
    // first_name: DataTypes.STRING,
    // last_name: DataTypes.STRING,
    // phone: DataTypes.STRING,
    // pickup_date: DataTypes.STRING,
    // pickup_time: DataTypes.STRING,
    // paid_status: DataTypes.STRING,
    // order_processed: DataTypes.STRING,
    // message:DataTypes.STRING,
    // design:DataTypes.STRING,
    // message_color:DataTypes.STRING,
    // other_message:DataTypes.STRING,
    // completed:DataTypes.BOOLEAN
	db.create({
		quantity:req.body.orderData.quantity,
		size:req.body.orderData.cake_size,
		icecream_flavors:req.body.orderData.icecream_flavor,
		cake_flavor:req.body.orderData.cake_flavor,
		first_name:req.body.orderData.first_name,
		last_name:req.body.orderData.last_name,
		phone:req.body.orderData.phone_number,
		pickup_date:req.body.orderData.pickup_date,
		pickup_time:req.body.orderData.pickup_time,
		paid_status:req.body.orderData.paid_status,
		order_processed:'Mobile',
		message:req.body.orderData.cake_message,
		design:req.body.orderData.design_message,
		message_color:req.body.orderData.frosting_color,
		other_message:req.body.orderData.other_message,
		completed:false
	}).then(function(result){
		console.log('ORDER CREATED');
		res.json(result);
	})
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