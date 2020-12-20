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
}); //  MAP Fullscreen
//map.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector('map') }));

var latlongMap = new Map();

_countryCodes.country_codes.forEach(function (e) {
  return latlongMap.set(e.country, [e.longitude, e.latitude]);
});

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
  data.Countries.forEach(function (country, i) {
    var TotalConfirmed = country.TotalConfirmed,
        Country = country.Country;
    var marker = document.createElement('div');
    marker.className = 'marker';
    marker.setAttribute('data-id', i);
    marker.style.backgroundColor = getMarkColor(TotalConfirmed);
    new mapboxgl.Marker({
      color: getMarkColor(TotalConfirmed),
      element: marker
    }).setLngLat(latlongMap.get(Country)).addTo(map);
  });

  function mapFly(i) {
    return map.flyTo({
      center: latlongMap.get(data.Countries[i].Country),
      zoom: 4,
      essential: true
    });
  }

  function addPopup(i) {
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
    popup.setLngLat(latlongMap.get(data.Countries[i].Country)).setHTML("<strong>".concat(data.Countries[i].Country, "</strong>: confirmed ").concat(data.Countries[i].TotalConfirmed)).addTo(map);
  }

  var allMap = document.querySelector('.map');
  allMap.addEventListener('click', function (event) {
    var target = event.target;

    if (target.className.slice(0, 6) !== 'marker') {
      return;
    } else {
      mapFly(target.getAttribute('data-id'));
    }
  });
  allMap.addEventListener('mouseover', function (event) {
    var target = event.target;

    if (target.className.slice(0, 6) !== 'marker') {
      return;
    } else {
      var i = target.getAttribute('data-id');
      addPopup(i);
    }

    allMap.addEventListener('mouseout', function (event) {
      var target = event.target;

      if (target.className.slice(0, 6) !== 'marker') {
        return;
      } else {
        if (document.querySelector('.mapboxgl-popup')) document.querySelector('.mapboxgl-popup').remove();
      }
    });
  });
})["catch"](function () {
  return new Error();
});