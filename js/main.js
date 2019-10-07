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
var PIN_SIZE = {'height': 70, 'width': 50};
var APARTAMENTS_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
var CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];
var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var DESCRIPTION = 'bla-bla-bla';
var ARRAY_LENGTH = 8;
var GUESTS_END_ARRAY = ['гостя', 'гостей', 'гостей'];
var ROOMS_END_ARRAY = ['комната', 'комнаты', 'комнат'];

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

var renderPin = function (pin) {
  var pinTemplate = document.querySelector('#pin').content
      .querySelector('.map__pin');
  var clonedElement = pinTemplate.cloneNode(true);
  clonedElement.style.left = (mockArray[pin].location.x - PIN_SIZE.width / 2) + 'px';
  clonedElement.style.top = (mockArray[pin].location.y - PIN_SIZE.height) + 'px';
  var innerImg = clonedElement.querySelector('img');
  innerImg.alt = mockArray[pin].offer.title;
  innerImg.src = mockArray[pin].author.avatar;
  clonedElement.tabindex = 0;
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');


var renderAdCard = function (cardData) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var clonedCard = cardTemplate.cloneNode(true);
  clonedCard.querySelector('.popup__title').textContent = cardData.offer.title;
  clonedCard.querySelector('.popup__text--address').textContent = cardData.offer.address;
  clonedCard.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
  clonedCard.querySelector('.popup__type').textContent = cardData.offer.type;

  var numDecline = function (num, nominative, genitiveSingular, genitivePlural) {
    var decline;
    if (num > 10 && (Math.round((num % 100) / 10)) === 1) {
      decline = nominative;
    } else {
      switch (num % 10) {
        case 1: decline = nominative;
          break;
        case 2:
        case 3:
        case 4: decline = genitiveSingular;
          break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 0: decline = genitivePlural;
          break;
      }
    }
    return decline;
  };

  clonedCard.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' ' + numDecline(cardData.offer.rooms, ROOMS_END_ARRAY[0], ROOMS_END_ARRAY[1], ROOMS_END_ARRAY[2]) + ' для ' + cardData.offer.guests + ' ' + numDecline(cardData.offer.guests, GUESTS_END_ARRAY[0], GUESTS_END_ARRAY[1], GUESTS_END_ARRAY[2]);


  clonedCard.querySelector('.popup__text--time').textContent = 'Заезд после' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

  var featuresList = clonedCard.querySelectorAll('.popup__feature');
  for (var i = 0; i < FEATURES_ARRAY.length; i++) {
    if (cardData.offer.features.indexOf(FEATURES_ARRAY[i]) === -1) {
      featuresList[i].style.display = 'none';
    }
  }

  clonedCard.querySelector('.popup__description').textContent = cardData.offer.description;

  var photo = clonedCard.querySelector('.popup__photo');
  var imgFragment = document.createDocumentFragment();
  for (var j = 0; j < cardData.offer.photos.length; j++) {
    var clonedPhoto = photo.cloneNode(true);
    clonedPhoto.src = cardData.offer.photos[j];
    imgFragment.appendChild(clonedPhoto);
  }
  clonedCard.querySelector('.popup__photos').replaceChild(imgFragment, photo);
  clonedCard.querySelector('.popup__avatar').src = cardData.author.avatar;

  return clonedCard;
};

var placeForDescriptionInsert = document.querySelector('.map__filters-container');
var fragment = document.createDocumentFragment();
fragment.appendChild(renderAdCard(mockArray[0]));
placeForDescriptionInsert.before(fragment);
