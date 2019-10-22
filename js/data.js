// module data.js
'use strict';

var MIN_ROOMS = 1;
var MAX_ROOMS = 10;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var PRICE_LIMITER = 10000;
var LOCATION_X_MIN = 1;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var BLOCK_WIDTH = document.querySelector('.map').offsetWidth;

var APARTAMENTS_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
var CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];
var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var DESCRIPTION = 'bla-bla-bla';
var ARRAY_LENGTH = 8;


var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var renderAvatarUrl = function (i) {
  var avatar = 'img/avatars/user' + '0' + (i + 1) + '.png';
  return avatar;
};

var renderTitle = function (i) {
  var title = 'заголовок предложения ' + i;
  return title;
};

var getPrice = function () {
  var price = Math.floor(Math.random().toFixed(2) * PRICE_LIMITER);
  return price;
};

var getRandomArrayElements = function (array) {
  var randomElements = [];
  var constCounter = getRandomInt(1, array.length);
  for (var i = 0; i <= constCounter; i++) {
    var element = array[getRandomInt(0, array.length - 1)];
    if (randomElements.indexOf(element) === -1) {
      randomElements.push(element);
    }
  }
  return randomElements;
};

var getRandomArrayElement = function (array) {
  var randomElement = array[getRandomInt(0, array.length - 1)];
  return randomElement;
};

var getRoomsQuantity = function () {
  var rooms = getRandomInt(MIN_ROOMS, MAX_ROOMS);
  return rooms;
};

var getGuestsQuantity = function () {
  var guests = getRandomInt(MIN_GUESTS, MAX_GUESTS);
  return guests;
};

var getLocation = function () {
  var location = {};
  location.x = getRandomInt(LOCATION_X_MIN, BLOCK_WIDTH);
  location.y = getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
  return location;
};

var renderMock = function () {
  var mock = [];
  for (var i = 0; i < ARRAY_LENGTH; i++) {
    var mockElement = {
      'author': {
        'avatar': renderAvatarUrl(i)
      },

      'offer': {
        'title': renderTitle(i),
        'address': getLocation().x + ', ' + getLocation().y,
        'price': getPrice(),
        'type': getRandomArrayElement(APARTAMENTS_ARRAY),
        'rooms': getRoomsQuantity(),
        'guests': getGuestsQuantity(),
        'checkin': getRandomArrayElement(CHECKIN_ARRAY),
        'checkout': getRandomArrayElement(CHECKOUT_ARRAY),
        'features': getRandomArrayElements(FEATURES_ARRAY),
        'description': DESCRIPTION,
        'photos': getRandomArrayElements(PHOTOS_ARRAY)
      },

      'location': getLocation()
    };
    mock.push(mockElement);
  }
  return mock;
};

var mockArray = renderMock();

