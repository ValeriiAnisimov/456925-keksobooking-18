'use strict';

var map = document.querySelector('.map');

var blockWidth = 1000;
var pinSize = {'height': 70, 'width': 50};
var apartamentsArray = ['palace', 'flat', 'house', 'bungalo'];
var checkinArray = ['12:00', '13:00', '14:00'];
var checkoutArray = ['12:00', '13:00', '14:00'];
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var description = 'bla-bla-bla';
var arrayLength = 8;

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
  var price = Math.floor(Math.random().toFixed(2) * 10000);
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
  var rooms = getRandomInt(0, 3);
  return rooms;
};

var getGuestsQuantity = function () {
  var guests = getRandomInt(0, 10);
  return guests;
};

var getLocation = function () {
  var location = {};
  location.x = getRandomInt(1, blockWidth) - pinSize.width;
  location.y = getRandomInt(130, 630) - pinSize.height;
  return location;
};

var renderMock = function () {
  var mock = [];
  for (var i = 0; i < arrayLength; i++) {
    var mockElement = {
      'author': {
        'avatar': renderAvatarUrl(i)
      },

      'offer': {
        'title': renderTitle(i),
        'address': getLocation().x + ', ' + getLocation().y,
        'price': getPrice(),
        'type': getRandomArrayElement(apartamentsArray),
        'rooms': getRoomsQuantity(),
        'guests': getGuestsQuantity(),
        'checkin': getRandomArrayElement(checkinArray),
        'checkout': getRandomArrayElement(checkoutArray),
        'features': getRandomArrayElements(featuresArray),
        'description': description,
        'photos': getRandomArrayElements(photosArray)
      },

      'location': getLocation()
    };
    mock.push(mockElement);
  }
  return mock;
};

var mockArray = renderMock();

var renderPin = function (i) {
  var pinTemplate = document.querySelector('#pin').content
      .querySelector('.map__pin');
  var clonedElement = pinTemplate.cloneNode(true);
  clonedElement.style = 'left: ' + mockArray[i].location.x + 'px; top: ' + mockArray[i].location.y + 'px;';
  var innerImg = clonedElement.querySelector('img');
  innerImg.alt = mockArray[i].offer.title;
  innerImg.src = mockArray[i].author.avatar;
  return clonedElement;
};

var renderPinsList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i <= mockArray.length - 1; i++) {
    fragment.appendChild(renderPin(i));
  }
  return (fragment);
};

var setPinsList = function () {
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(renderPinsList(mockArray));
};

setPinsList();

map.classList.remove('map--faded');
