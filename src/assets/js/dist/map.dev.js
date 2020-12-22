"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapFly = mapFly;
exports.addMapOpt = addMapOpt;

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

map.addControl(new mapboxgl.FullscreenControl({}));
var latlongMap = new Map();

_countryCodes.country_codes.forEach(function (e) {
  return latlongMap.set(e.country, [e.longitude, e.latitude]);
});

var getMarkColor = function getMarkColor(x, y, get) {
  var arr = [[1000, 10000, 100000], [1000, 10000, 100000], [10, 100, 1000]];

  if (get) {
    switch (y) {
      case 0:
        return ['#f4d8b5', '#fac079', '#faa53c', '#fa8a00'];

      case 1:
        return ['#c3fcbc', '#89ff7b', '#56ff42', '#1bff00'];

      default:
        return ['#f4b5b5', '#fa8080', '#f84848', '#ae0000'];
    }
  }

  switch (y) {
    case 0:
      if (x <= arr[y][0]) {
        return '#f4d8b5';
      }

      if (x <= arr[y][1]) {
        return '#fac079';
      }

      if (x <= arr[y][2]) {
        return '#faa53c';
      }

      return '#fa8a00';

    case 1:
      if (x <= arr[y][0]) {
        return '#c3fcbc';
      }

      if (x <= arr[y][1]) {
        return '#89ff7b';
      }

      if (x <= arr[y][2]) {
        return '#56ff42';
      }

      return '#1bff00';

    default:
      if (x <= arr[y][0]) {
        return '#f4b5b5';
      }

      if (x <= arr[y][1]) {
        return '#fa8080';
      }

      if (x <= arr[y][2]) {
        return '#f84848';
      }

      return '#ae0000';
  }
};

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function mapFly(name) {
  return map.flyTo({
    center: latlongMap.get(name),
    zoom: 4,
    essential: true,
    speed: 0.7
  });
}

document.querySelector('.icon-menu-zoom').addEventListener('click', function () {
  map.flyTo({
    center: [50, 20],
    zoom: 0.5,
    essential: true,
    speed: 1.3
  });
});

function addMapOpt(data) {
  var prev = document.querySelector('.map-prev');
  var next = document.querySelector('.map-next');
  var arrTitle = ['Map Confirmed', 'Map Recovered', 'Map Deaths'];
  var arrType = ['TotalConfirmed', 'TotalRecovered', 'TotalDeaths'];
  var arrLegNum = [['1000', '10 000', '100 000'], ['1000', '10 000', '100 000'], ['10', '100', '1000']];
  var arrPopupTitle = ['confirmed', 'recovered', 'deaths'];

  function selectMapData() {
    var index = 0;
    next.addEventListener('click', function () {
      document.querySelectorAll('.marker').forEach(function (e) {
        return e.remove();
      });

      if (index === 2) {
        index = 0;
      } else {
        index++;
      }

      generateMapData(index);
    });
    prev.addEventListener('click', function () {
      document.querySelectorAll('.marker').forEach(function (e) {
        return e.remove();
      });

      if (index === 0) {
        index = 2;
      } else {
        index--;
      }

      generateMapData(index);
    });
  }

  selectMapData();
  generateMapData(0);

  function generateMapData(index) {
    document.querySelector('.map__title').innerHTML = "".concat(arrTitle[index], " (for the world <i>").concat(data.Global[arrType[index]], "</i>)");
    document.querySelector('.map__title > i').style.color = "".concat(getMarkColor(1, index, true)[3]);
    var mapLegend = document.querySelector('.map-legend');
    mapLegend.innerHTML = "<div class='map_leg1'></div> < ".concat(arrLegNum[index][0], " <div class='map_leg2'></div> < ").concat(arrLegNum[index][1], " <div class='map_leg3'></div> < ").concat(arrLegNum[index][2], "<div class='map_leg4'></div> > ").concat(arrLegNum[index][2]);
    document.querySelector('.map_leg1').style.backgroundColor = getMarkColor(1, index, true)[0];
    document.querySelector('.map_leg2').style.backgroundColor = getMarkColor(1, index, true)[1];
    document.querySelector('.map_leg3').style.backgroundColor = getMarkColor(1, index, true)[2];
    document.querySelector('.map_leg4').style.backgroundColor = getMarkColor(1, index, true)[3];
    data.Countries.forEach(function (country, i) {
      var marker = document.createElement('div');
      marker.className = 'marker';
      marker.setAttribute('data-id', i);
      marker.style.backgroundColor = getMarkColor(country[arrType[index]], index);
      new mapboxgl.Marker({
        element: marker
      }).setLngLat(latlongMap.get(country.Country)).addTo(map);
    });

    function addPopup(i) {
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
      popup.setLngLat(latlongMap.get(data.Countries[i].Country)).setHTML("<strong>".concat(data.Countries[i].Country, "</strong>: ").concat(arrPopupTitle[index], " ").concat(data.Countries[i][arrType[index]])).addTo(map);
    }

    var allMap = document.querySelector('.map');
    allMap.addEventListener('click', function (event) {
      var target = event.target;

      if (target.className.slice(0, 6) !== 'marker') {
        return;
      } else {
        var id = target.getAttribute('data-id');
        mapFly(data.Countries[id].Country);
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
  }
}