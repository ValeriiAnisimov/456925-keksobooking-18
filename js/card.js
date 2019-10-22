'use strict';

var GUESTS_END_ARRAY = ['гостя', 'гостей', 'гостей'];
var ROOMS_END_ARRAY = ['комната', 'комнаты', 'комнат'];

var renderAddCard = function (cardData) {
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

  var popupClose = clonedCard.querySelector('.popup__close');
  popupClose.addEventListener('click', function () {
    clonedCard.parentElement.removeChild(clonedCard);
  });


  return clonedCard;
};

var setAddCard = function (pin) {
  var placeForDescriptionInsert = document.querySelector('.map__filters-container');
  var popup = map.querySelector('.popup');
  if (popup !== null) {
    popup.remove();
  }
  placeForDescriptionInsert.before(renderAddCard(pin));
};
