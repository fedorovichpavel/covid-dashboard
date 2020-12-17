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

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
fetch('https://api.covid19api.com/summary', requestOptions).then(function (response) {
  return response.json();
}).then(function (data) {
  data.Countries.forEach(function (country) {
    var TotalConfirmed = country.TotalConfirmed,
        Country = country.Country;
    new mapboxgl.Marker({
      color: getMarkColor(TotalConfirmed)
    }).setLngLat(latlongMap.get(Country)).addTo(map);
  });
})["catch"](function () {
  return new Error();
});