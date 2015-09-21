'use strict';

var express = require('express');
var router = express.Router();
var icecreamFlavors = require('../models').IcecreamFlavors;
var cakeFlavors = require('../models').CakeFlavors;
var cakeSizes = require('../models').CakeSizes;
var quantityAmt = require('../models').Quantity;
var presetMessages = require('../models').PresetMessages;
var frostingColors = require('../models').MessageColors;
var bodyParser = require('body-parser');


/*Ahh so gross.  Need to find a way to clean this up.*/
function createDataSheet(callback) {
  var details = [];
  frostingColors.findAll().then(function(colors) {
    details.push(colors);
    presetMessages.findAll().then(function(messages) {
      details.push(messages);
      icecreamFlavors.findAll().then(function(sizes) {
        details.push(sizes);
        cakeFlavors.findAll().then(function(flavors) {
          details.push(flavors);
          cakeSizes.findAll().then(function(sizes) {
            details.push(sizes);
            quantityAmt.findAll().then(function(quantity) {
              details.push(quantity);
              callback(details);
            });
          });
        });
      });
    });
  });
}

router.get('/all', function(req, res) {
  var details = createDataSheet(function(result) {
    res.json(result);
  });

});

router.get('/icecream_flavors', function(req, res) {
  icecreamFlavors.findAll().then(function(flavors) {
    res.json(flavors);
  });
});

router.get('/cake_flavors', function(req, res) {
  cakeFlavors.findAll().then(function(flavors) {
    res.json(flavors);
  });
});

router.get('/cake_sizes', function(req, res) {
  icecreamFlavors.findAll().then(function(sizes) {
    res.json(sizes);
  });
});

router.get('/preset_messages', function(req, res) {
  presetMessages.findAll().then(function(messages) {
    res.json(messages);
  });
});

router.get('/frosting_colors', function(req, res) {
  frostingColors.findAll().then(function(colors) {
    res.json(colors);
  });
});

router.post('/icecream_flavors', function(req, res) {
  if (!req.body.flavor) {
    res.json({
      success: false
    });
    return;
  }
  icecreamFlavors.create({
    flavor: req.body.flavor
  }).then(function() {
    res.json({
      success: true
    });
  });
});

router.post('/cake_flavors', function(req, res) {
  if (!req.body.flavor) {
    res.json({
      success: false
    });
    return;
  }
  cakeFlavors.create({
    flavor: req.body.flavor
  }).then(function() {
    res.json({
      success: true
    });
  });
});

router.post('/cake_sizes', function(req, res) {
  if (!req.body.size) {
    res.json({
      success: false
    });
    return;
  }
  cakeSizes.create({
    size: req.body.size
  }).then(function() {
    res.json({
      success: true
    });
  });

});

router.post('/preset_messages', function(req, res) {
  if (!req.body.message) {
    res.json({
      success: false
    });
    return;
  }
  presetMessages.create({
    message: req.body.message
  }).then(function() {
    res.json({
      success: true
    });
  });
});

router.post('/frosting_colors', function(req, res) {
  if (!req.body.color) {
    res.json({
      success: false
    });
    return;
  }
  frostingColors.create({
    color: req.body.color
  }).then(function() {
    res.json({
      success: true
    });
  });
});



module.exports = router;