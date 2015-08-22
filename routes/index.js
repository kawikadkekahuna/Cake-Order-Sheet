'use strict';

var express = require('express');
var router = express.Router();
var order_routes = require('./order_routes');
var flavor_routes = require('./flavor_routes');


router.use('/order_routes',order_routes);
router.use('/order_routes',flavor_routes);

module.exports = router;