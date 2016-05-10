'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').db;
var Place = require('../models').Place;
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;
var Promise = require('bluebird');
module.exports = router;

router.get("/", function (req, res, next) {
  // Hotel.findAll({}).exec().then(function(dbHotels) {
  //   Restaurant.findAll({}).exec().then(function(dbRestaurants) {
  //     Activity.findAll({}).exec().then(function(dbActivities) {
  //       res.render('index', {
  //         templateHotels: dbHotels,
  //         templateRestaurants: dbRestaurants,
  //         templateActivities: dbActivities
  //       });
  //     }).then(null, console.log);
  //   }).then(null, console.log);
  // }).then(null, console.log);
  var hotelPromise = Hotel.findAll();
  var restaurantPromise = Restaurant.findAll();
  var placePromise = Place.findAll();
  var activityPromise = Activity.findAll();
  Promise.all([placePromise, hotelPromise, restaurantPromise, activityPromise])
  .then(function(values) {
    console.log(values[1])
    var places = values[0];
    var hotels = values[1];
    var restaurants = values[2];
    var activities = values[3]
    res.render('index', {
      templatePlaces: places,
      templateHotels: hotels,
      templateRestaurants: restaurants,
      templateActivities: activities
    })
  }).catch(next);
})