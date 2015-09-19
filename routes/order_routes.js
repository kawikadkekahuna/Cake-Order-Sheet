'use strict';

var express = require('express');
var router = express.Router();
var preset_messages = require('../models').PresetMessage;
var message_colors = require('../models').MessageColor;
var orders = require('../models').Order;
var bodyParser = require('body-parser');

router.get('/all_orders', function (req, res) {
  orders.findAll().then(function (orders) {
    res.json(orders);
  });
});

router.post('/place_order', function (req, res) {
  orders.create({
    icecream_flavor: req.body.icecream_flavor,
    cake_flavor: req.body.cake_flavor,
    cake_size: req.body.cake_size,
    quantity: req.body.quantity,
    frosting_color: req.body.frosting_color,
    order_design: req.body.order_design,
    message_color: req.body.message_color,
    additional_notes: req.body.additional_notes,
    order_message: req.body.order_message,
    order_paid: req.body.order_paid,
    order_processed: req.body.order_processed,
    pickup_date: req.body.pickup_date,
    pickup_time: req.body.pickup_time,
    completed: req.body.completed,
    cake_status: req.body.cake_status,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number
  });
});

router.put('/edit_order', function (req, res) {

});

module.exports = router;