"use strict";

var _countryCodes = require("./country-codes");

var mapBox = 'pk.eyJ1IjoiZmVkb3JvdmljaHBhdmVsIiwiYSI6ImNraW5lcTkzMzBtMW8ycm81cTd6N3N3aDIifQ.botvkeUgOwWBdkRdCIwuWg';
mapboxgl.accessToken = mapBox;
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 0.5,
  center: [50, 20],
  scroll: false
});
var latlongMap = new Map();

_countryCodes.country_codes.forEach(function (e) {
  return latlongMap.set(e.country, [e.longitude, e.latitude]);
});
/* Определение местоположения
fetch("http://api.ipstack.com/37.215.40.61?access_key=4d45dec0ea3029c6c74945486042836a&format=1", requestOptions)
    .then(response => response.json())
    .then(data => { console.log(data) })
    */


var getMarkColor = function getMarkColor(x) {
  if (x <= 100) {
    return '#f6dddd';
  }

  if (x <= 1000) {
    return '#f4b5b5';
  }

  if (x <= 10000) {
    return '#fa8080';
  }

  if (x <= 100000) {
    return '#f84848';
  }

  return '#ae0000';
};

window.onload = function _callee() {
  var data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(new Promise(function (resolve) {
            return setTimeout(resolve, 1000);
          }));

        case 2:
          data = JSON.parse(localStorage.getItem('summaryApi'));
          data.Countries.forEach(function (country) {
            var TotalConfirmed = country.TotalConfirmed,
                Country = country.Country;
            new mapboxgl.Marker({
              color: getMarkColor(TotalConfirmed)
            }).setLngLat(latlongMap.get(Country)).addTo(map);
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};