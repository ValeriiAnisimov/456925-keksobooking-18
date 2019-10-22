'use strict';

var PIN_SIZE = {'height': 70, 'width': 50};

var pinDeactivating = function () {
  var activePin = document.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
};
var setActivePin = function (evt) {
  pinDeactivating();
  evt.currentTarget.classList.add('map__pin--active');
};

var renderPin = function (pin) {
  var pinTemplate = document.querySelector('#pin').content
      .querySelector('.map__pin');
  var clonedElement = pinTemplate.cloneNode(true);
  clonedElement.style.left = (pin.location.x + PIN_SIZE.width / 2) + 'px';
  clonedElement.style.top = (pin.location.y + PIN_SIZE.height) + 'px';
  var innerImg = clonedElement.querySelector('img');
  innerImg.alt = pin.offer.title;
  innerImg.src = pin.author.avatar;
  clonedElement.tabindex = 0;

  clonedElement.addEventListener('click', function (evt) {
    setAddCard(pin);
    setActivePin(evt);
  });

  clonedElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      setAddCard(pin);
    }
  });

  return clonedElement;
};

var renderPinsList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i <= mockArray.length - 1; i++) {
    fragment.appendChild(renderPin(mockArray[i]));
  }
  return (fragment);
};

var setPinsList = function () {
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(renderPinsList(mockArray));
};
