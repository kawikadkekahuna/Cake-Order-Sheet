'use strict';

var express = require('express');
var router = express.Router();
var preset_messages = require('../models').PresetMessage;
var message_colors = require('../models').MessageColor;
var orders = require('../models').Order;
var bodyParser = require('body-parser');

router.get('/all_orders', function(req, res) {
  orders.findAll().then(function(orders) {
    res.json(orders);
  });
});

router.post('/place_order', function(req, res) {
  req.body.orderData = JSON.parse(req.body.orderData);
  console.log(req.body.orderData);
  orders.create({
    icecream_flavor: req.body.orderData.icecream_flavor,
    cake_flavor: req.body.orderData.cake_flavor,
    cake_size: req.body.orderData.cake_size,
    quantity: req.body.orderData.quantity,
    frosting_color: req.body.orderData.frosting_color,
    order_design: req.body.orderData.order_design,
    message_color: req.body.orderData.message_color,
    additional_notes: req.body.orderData.additional_notes,
    order_message: req.body.orderData.order_message,
    order_paid: req.body.orderData.order_paid,
    order_processed: req.body.orderData.order_processed_text,
    pickup_date: req.body.orderData.pickup_date,
    pickup_time: req.body.orderData.pickup_time,
    completed: false,
    cake_status: 'Not-Built',
    cake_message: req.body.orderData.cake_message,
    design_message: req.body.orderData.design_message,
    first_name: req.body.orderData.first_name,
    last_name: req.body.orderData.last_name,

    phone_number: req.body.orderData.phone_number,

  }).then(function(data){
    res.json(data);
  })
});

router.post('/update_status', function(req, res) {
  orders.findOne({
    where: {
      id: req.body.id
    }
  }).then(function(order) {
    order.updateAttributes({
      'cake_status': req.body.name
    }).then(function(orderData) {
      res.json(orderData)
    });
  });

});

router.post('/complete', function(req, res) {

  orders.findOne({
    where: {
      id: req.body.id
    }
  }).then(function(order) {
    order.updateAttributes({
      'completed': true
    }).then(function(orderData) {
      res.json(orderData)
    });
  });

});

router.post('/incomplete', function(req, res) {

  orders.findOne({
    where: {
      id: req.body.id
    }
  }).then(function(order) {
    order.updateAttributes({
      'completed': false
    }).then(function(orderData) {
      res.json(orderData)
    });
  });

});
router.put('/edit_order', function(req, res) {

});

module.exports = router;