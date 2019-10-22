'use strict';

var MAIN_PIN_POINTER = 22;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var ROOMS_CAPACITY_VALUES = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
var BOOKING_DATA = {
  bungalo: {
    ru: 'Бунгало',
    price: 0
  },

  flat: {
    ru: 'Квартира',
    price: 1000
  },

  house: {
    ru: 'Дом',
    price: 5000
  },

  palace: {
    ru: 'Дворец',
    price: 10000
  }
};

var formList = document.querySelectorAll('.ad-form fieldset, .ad-form input, .ad-form select, map__filters fieldset, .map__filters input, .map__filters select');
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.ad-form');
var mainPinWidth = mainPin.offsetWidth;
var mainPinHeight = mainPin.offsetHeight;
var inputAddress = document.querySelector('#address');
var initialInputAddres = (parseInt(mainPin.style.left, 10) - mainPinWidth / 2).toFixed() + ', ' + (parseInt(mainPin.style.top, 10) + mainPinHeight / 2).toFixed();
var activatedInputAddress = (parseInt(mainPin.style.left, 10) - mainPinWidth / 2).toFixed() + ', ' + (parseInt(mainPin.style.top, 10) + (mainPinHeight + MAIN_PIN_POINTER)).toFixed();

var toggleInputHandler = function () {
  for (var i = 0; i < formList.length; i++) {
    formList[i].disabled = !formList[i].disabled;
  }
};

toggleInputHandler();

var activationeMapAndForm = function () {
  setPinsList();

  toggleInputHandler();
  map.classList.remove('map--faded');
  mainForm.classList.remove('ad-form--disabled');
  inputAddress.value = activatedInputAddress;

  mainPin.removeEventListener('mousedown', activationeMapAndForm);
  mainPin.removeEventListener('keydown', mainPinEnterHandler);
};
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    var popup = map.querySelector('.popup');
    if (popup !== null) {
      popup.remove();
    }
    //pinDeactivating();
  }
});

inputAddress.value = initialInputAddres;

mainPin.style.tabindex = '0';
var mainPinEnterHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activationeMapAndForm();
  }
};
mainPin.addEventListener('mousedown', activationeMapAndForm);
mainPin.addEventListener('keydown', mainPinEnterHandler);

var roomsAmountSelect = mainForm.querySelector('#room_number');
var capacitySelect = mainForm.querySelector('#capacity');

var roomsInputValidationHandler = function () {
  if (capacitySelect.options.length > 0) {
    [].forEach.call(capacitySelect.options, function (item) {
      item.selected = ROOMS_CAPACITY_VALUES[roomsAmountSelect.value][0] === item.value;
      item.disabled = !(ROOMS_CAPACITY_VALUES[roomsAmountSelect.value].indexOf(item.value) >= 0);
    });
  }
};

roomsInputValidationHandler();

roomsAmountSelect.addEventListener('change', function () {
  roomsInputValidationHandler();
});

var aparnamentType = mainForm.querySelector('#type');
var bookingPrice = mainForm.querySelector('#price');
aparnamentType.addEventListener('change', function () {
  bookingPrice.placeholder = BOOKING_DATA[aparnamentType.value].price;
  bookingPrice.min = BOOKING_DATA[aparnamentType.value].price;
});

var timeInSet = mainForm.querySelector('#timein');
var timeOutSet = mainForm.querySelector('#timeout');
timeInSet.addEventListener('change', function () {
  timeOutSet.value = timeInSet.value;
});
timeOutSet.addEventListener('change', function () {
  timeInSet.value = timeInSet.value;
});
