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

var myArray = {
  hotel: "",
  restaurants: [],
  activities: [] 
}

var daysArray = [1,2,3,4];

router.get("/", function (req, res, next) {
  var hotelPromise = Hotel.findAll();
  var restaurantPromise = Restaurant.findAll();
  var placePromise = Place.findAll();
  var activityPromise = Activity.findAll();  
  Promise.all([placePromise, hotelPromise, restaurantPromise, activityPromise])
  .then(function(values) {
    var places = values[0];
    var hotels = values[1];
    var restaurants = values[2];
    var activities = values[3]
    res.render('index', {
      templatePlaces: places,
      templateHotels: hotels,
      templateRestaurants: restaurants,
      templateActivities: activities,
      myArray: myArray,
      daysArray: daysArray
    })
  }).catch(next);
})

router.post("/hotels", function (req, res, next) {
  myArray.hotel = req.body.hotels;
  res.redirect('/');
});

router.post("/restaurants", function (req, res, next) {
  if (myArray.restaurants.indexOf(req.body.restaurants) === -1) {
    myArray.restaurants.push(req.body.restaurants);
  }
  res.redirect('/');
});

router.post("/activities", function (req, res, next) {
  if (myArray.activities.indexOf(req.body.activities) === -1) {
    myArray.activities.push(req.body.activities);
  }
  res.redirect('/');
});