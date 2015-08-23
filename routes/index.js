'use strict';

var express = require('express');
var router = express.Router();
var order_routes = require('./order_routes');
var icecream_routes = require('./icecream_routes');
var cake_routes = require('./cake_routes');


router.use('/order_routes',order_routes);
router.use('/icecream_routes',icecream_routes);
router.use('/cake_routes',cake_routes);

module.exports = router;