"use strict";

var _dataCountry = require("./dataCountry");

//GLOBAL DATA
var objDataGlobal = {
  totalConfirmed: 0,
  totalRecovered: 0,
  totalDeaths: 0,
  newConfirmed: 0,
  newRecovered: 0,
  newDeaths: 0,
  countries: []
};
var data;
var arrData; //get data on page load

addEventListener('load', getData); //get new data at 00:00 every day

var updateData = setInterval(function () {
  var today = new Date();
  var hour = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();

  if (hour === 0 && min === 0 && sec === 0) {
    getGlobalData(); // setGlobalDataToLocal();
  }
}, 1000); //get date for last load data

function getData() {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var hour = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();

  if (day < 10) {
    document.getElementById('dd').innerText = '0' + day;
  } else document.getElementById('dd').innerText = day;

  if (month < 10) {
    document.getElementById('mm').innerText = '0' + month;
  } else document.getElementById('mm').innerText = month;

  document.getElementById('yy').innerText = year;

  if (hour < 10) {
    document.getElementById('hours').innerText = '0' + hour;
  } else document.getElementById('hours').innerText = hour;

  if (min < 10) {
    document.getElementById('minutes').innerText = '0' + min;
  } else document.getElementById('minutes').innerText = min; //get data for API


  getGlobalData();
}

function getGlobalData() {
  var url, res;
  return regeneratorRuntime.async(function getGlobalData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = 'https://api.covid19api.com/summary';
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          res = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(res.json());

        case 6:
          data = _context.sent;
          //set data global
          objDataGlobal.totalConfirmed = data.Global.TotalConfirmed;
          objDataGlobal.totalRecovered = data.Global.TotalRecovered;
          objDataGlobal.totalDeaths = data.Global.TotalDeaths; //set data last day

          objDataGlobal.newConfirmed = data.Global.NewConfirmed;
          objDataGlobal.newRecovered = data.Global.NewRecovered;
          objDataGlobal.newDeaths = data.Global.NewDeaths; //set data by country

          objDataGlobal.countries = data.Countries; //add data to DOM

          addToDOM();

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}

function addToDOM() {
  console.log(objDataGlobal.countries);

  function getGlobalDatatoDom() {
    // default data
    var countPeopleAll = 7827000000;
    var countPeople = countPeopleAll / 100000; //data global per 100 thousand population

    var totalConfirmedForPeople = Math.round(objDataGlobal.totalConfirmed / countPeople);
    var totalRecoveredForPeople = Math.round(objDataGlobal.totalRecovered / countPeople);
    var totalDeathsForPeople = Math.round(objDataGlobal.totalDeaths / countPeople); //data last day per 100 thousand population

    var newConfirmedForPeople = Math.round(objDataGlobal.newConfirmed / countPeople);
    var newRecoveredForPeople = Math.round(objDataGlobal.newRecovered / countPeople);
    var newDeathsForPeople = Math.round(objDataGlobal.newDeaths / countPeople);
    arrData = [[objDataGlobal.totalConfirmed, objDataGlobal.totalRecovered, objDataGlobal.totalDeaths, 'Global for the world', '(absolute values)'], [objDataGlobal.newConfirmed, objDataGlobal.newRecovered, objDataGlobal.newDeaths, 'Global for the last day', '(absolute values)'], [totalConfirmedForPeople, totalRecoveredForPeople, totalDeathsForPeople, 'Global for the world', '(per 100 thousand population)'], [newConfirmedForPeople, newRecoveredForPeople, newDeathsForPeople, 'Global for the last day', '(per 100 thousand population)']];
  }

  getGlobalDatatoDom(); //add data to DOM

  var dataCases = document.querySelector('.data-cases p');
  var dataRecovered = document.querySelector('.data-recovered p');
  var dataDeaths = document.querySelector('.data-deaths p');
  var headerWidget = document.querySelector('.global h3');
  var headerWidgetNote = document.querySelector('.note'); //value default - global

  var startIndex = 0;
  addContentGlobalDate(startIndex); //select other global data

  selectData();

  function selectData() {
    var index = 0;
    var next = document.querySelector('.next');
    var prev = document.querySelector('.prev');
    var home = document.querySelector('.button-global');
    next.addEventListener('click', function () {
      if (index === 3) {
        index = 0;
      } else {
        index++;
      }

      addContentGlobalDate(index);
    });
    prev.addEventListener('click', function () {
      if (index === 0) {
        index = 3;
      } else {
        index--;
      }

      addContentGlobalDate(index);
    });
    home.addEventListener('click', function () {
      getGlobalDatatoDom();
      var startIndex = 0;
      addContentGlobalDate(startIndex);

      if (document.querySelector('.backlight')) {
        document.querySelector('.backlight').classList.remove('backlight');
      }

      document.querySelector('[name="country"]').value = '';
    });
  }

  function addContentGlobalDate(index) {
    dataCases.textContent = arrData[index][0].toLocaleString();
    dataRecovered.textContent = arrData[index][1].toLocaleString();
    dataDeaths.textContent = arrData[index][2].toLocaleString();
    headerWidget.textContent = arrData[index][3].toLocaleString();
    headerWidgetNote.textContent = arrData[index][4].toLocaleString();
  } //add list countries


  var parentCountries = document.querySelector('.countries');
  var countCountries = objDataGlobal.countries.length;

  for (var i = 0; i < countCountries; i++) {
    var itemList = document.createElement('li');
    itemList.classList.add('item-country');
    itemList.setAttribute('data-id', i);
    parentCountries.appendChild(itemList);
  }

  var listCountries = document.querySelectorAll('.countries .item-country');
  listCountries.forEach(function (item, i) {
    // item.setAttribute('data-id', objDataGlobal.countries[i].ID);
    var arrWork = objDataGlobal.countries;
    arrWork.sort(function (a, b) {
      return b.TotalConfirmed - a.TotalConfirmed;
    });
    item.textContent = arrWork[i].Country;
    var cMarker = arrWork[i].Country;
    console.log(cMarker);
    console.log(_dataCountry.dataCountry.filter(function (item) {
      return item.name === cMarker;
    })[0].flag);

    var flag = _dataCountry.dataCountry.filter(function (item) {
      return item.name === cMarker;
    })[0].flag;

    var itemFlag = document.createElement('span');
    itemFlag.classList.add('flag-country');
    item.prepend(itemFlag);
    itemFlag.style.background = "url(".concat(flag, ") no-repeat left center");
    itemFlag.style.backgroundSize = 'cover';
    var countForItem = document.createElement('span');
    item.appendChild(countForItem);
    countForItem.textContent = ' - ' + arrWork[i].TotalConfirmed.toLocaleString();
  }); //};
  //start list countries

  var arrWork = objDataGlobal.countries;
  var startSort = 0;
  arrWork = objDataGlobal.countries;
  arrWork.sort(function (a, b) {
    return b.TotalConfirmed - a.TotalConfirmed;
  });
  addNewListCountries(startSort, arrWork);

  function addNewListCountries(sort, arrWork) {
    var listCountries = document.querySelectorAll('.countries .item-country');
    listCountries.forEach(function (item, i) {
      // //sort
      // let arrWork = objDataGlobal.countries;
      // arrWork.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      //add name country
      item.textContent = arrWork[i].Country; //add flag

      var cMarker = arrWork[i].Country;

      var flag = _dataCountry.dataCountry.filter(function (item) {
        return item.name === cMarker;
      })[0].flag;

      var itemFlag = document.createElement('span');
      itemFlag.classList.add('flag-country');
      item.prepend(itemFlag);
      itemFlag.style.background = "url(".concat(flag, ") no-repeat left center");
      itemFlag.style.backgroundSize = 'cover'; //add data by sort

      var countForItem = document.createElement('span');
      item.appendChild(countForItem);

      switch (sort) {
        case 0:
          countForItem.textContent = ' - ' + arrWork[i].TotalConfirmed.toLocaleString();
          break;

        case 1:
          countForItem.textContent = ' - ' + arrWork[i].TotalRecovered.toLocaleString();
          break;

        case 2:
          countForItem.textContent = ' - ' + arrWork[i].TotalDeaths.toLocaleString();
          break;

        case 3:
          countForItem.textContent = ' - ' + arrWork[i].NewConfirmed.toLocaleString();
          break;

        case 4:
          countForItem.textContent = ' - ' + arrWork[i].NewRecovered.toLocaleString();
          break;

        case 5:
          countForItem.textContent = ' - ' + arrWork[i].NewDeaths.toLocaleString();
          break;

        default:
          countForItem.textContent = ' - ' + arrWork[i].TotalConfirmed.toLocaleString();
      } //countForItem.textContent = ' - ' + arrWork[i].TotalConfirmed.toLocaleString();

    });
  } //get data by country for click


  var selected;
  parentCountries.addEventListener('click', function (event) {
    var target = event.target;

    while (target !== parentCountries) {
      if (target.tagName === 'LI') {
        var backlight = function backlight(item) {
          if (selected) {
            selected.classList.remove('backlight');
          }

          selected = item;
          selected.classList.add('backlight');
        };

        var _i = target.getAttribute('data-id');

        viewDataForCountry(_i);
        backlight(target);
        return;
      }

      ;
      target = target.parentElement;
    }
  });

  function viewDataForCountry(i) {
    var item = objDataGlobal.countries[i]; //get data by country (population)

    var markerName = objDataGlobal.countries[i].Country;

    var checkedCountry = _dataCountry.dataCountry.filter(function (item) {
      return item.name === markerName;
    })[0].population; //get new numbers by checked country


    var countPeopleAll = checkedCountry;
    var countPeople = countPeopleAll / 100000; //data global per 100 thousand population

    var totalConfirmedForPeople = Math.round(item.TotalConfirmed / countPeople);
    var totalRecoveredForPeople = Math.round(item.TotalRecovered / countPeople);
    var totalDeathsForPeople = Math.round(item.TotalDeaths / countPeople); //data last day per 100 thousand population

    var newConfirmedForPeople = Math.round(objDataGlobal.newConfirmed / countPeople);
    var newRecoveredForPeople = Math.round(objDataGlobal.newRecovered / countPeople);
    var newDeathsForPeople = Math.round(objDataGlobal.newDeaths / countPeople);
    arrData = [[item.TotalConfirmed, item.TotalRecovered, item.TotalDeaths, "Data for the ".concat(markerName), '(absolute values)'], [item.NewConfirmed, item.NewRecovered, item.NewDeaths, "Data for the last day (".concat(markerName, ")"), '(absolute values)'], [totalConfirmedForPeople, totalRecoveredForPeople, totalDeathsForPeople, "Data for the ".concat(markerName), '(per 100 thousand population)'], [newConfirmedForPeople, newRecoveredForPeople, newDeathsForPeople, "Data for the last day (".concat(markerName, ")"), '(per 100 thousand population)']];
    var startIndex = 0;
    addContentGlobalDate(startIndex);
    document.querySelector('[name="country"]').value = markerName; //select other global data

    selectData();
  } //select other data to list countries


  selectDataCountries();

  function selectDataCountries() {
    var index = 0;
    var next = document.querySelector('.next-data');
    var prev = document.querySelector('.prev-data');
    next.addEventListener('click', function () {
      if (index === 5) {
        index = 0;
      } else {
        index++;
      }

      sortDate(index);
    });
    prev.addEventListener('click', function () {
      if (index === 0) {
        index = 5;
      } else {
        index--;
      }

      sortDate(index);
    });
  } //sort data by countries


  function sortDate(i) {
    var text = document.querySelector('.title-toggle');
    var arrWork;

    switch (i) {
      case 0:
        arrWork = objDataGlobal.countries;
        arrWork.sort(function (a, b) {
          return b.TotalConfirmed - a.TotalConfirmed;
        });
        text.textContent = 'global by country confirmed';
        break;

      case 1:
        arrWork = objDataGlobal.countries;
        arrWork.sort(function (a, b) {
          return b.TotalRecovered - a.TotalRecovered;
        });
        text.textContent = 'global by country recovered';
        break;

      case 2:
        arrWork = objDataGlobal.countries;
        arrWork.sort(function (a, b) {
          return b.TotalDeaths - a.TotalDeaths;
        });
        text.textContent = 'global by country deaths';
        break;

      case 3:
        arrWork = objDataGlobal.countries;
        arrWork.sort(function (a, b) {
          return b.NewConfirmed - a.NewConfirmed;
        });
        text.textContent = 'last day by country confirmed';
        break;

      case 4:
        arrWork = objDataGlobal.countries;
        arrWork.sort(function (a, b) {
          return b.NewRecovered - a.NewRecovered;
        });
        text.textContent = 'last day by country recovered';
        break;

      case 5:
        arrWork = objDataGlobal.countries;
        arrWork.sort(function (a, b) {
          return b.NewDeaths - a.NewDeaths;
        });
        text.textContent = 'last day by country deaths';
        break;

      default:
        break;
    }

    ;
    addNewListCountries(i, arrWork);
  }
}