'use strict';

var express = require('express');
var router = express.Router();
var order_routes = require('./order_routes');
var order_detail_routes = require('./order_detail_routes');


router.use('/order_routes',order_routes);
router.use('/order_detail_routes',order_detail_routes);


module.exports = router;