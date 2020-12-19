/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/normalize.css":
/*!***************************!*\
  !*** ./src/normalize.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/js/app.js":
/*!******************************!*\
  !*** ./src/assets/js/app.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataCountry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataCountry */ "./src/assets/js/dataCountry.js");

//GLOBAL DATA
let objDataGlobal = {
  totalConfirmed: 0,
  totalRecovered: 0,
  totalDeaths: 0,
  newConfirmed: 0,
  newRecovered: 0,
  newDeaths: 0,
  countries: []
}
let data;
let arrData;

//get data on page load
addEventListener('load', getData);

//get new data at 00:00 every day
let updateData = setInterval(function() {
  const today = new Date();
  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();
  if(hour === 0 && min === 0 && sec === 0) {getGlobalData(); setGlobalDataToLocal();}
}, 1000);

//function
function getData() {
  // if(localStorage.getItem('totalConfirmed') === undefined || localStorage.getItem('totalConfirmed') === '0') {
  //   getGlobalData();
  //   setGlobalDataToLocal();
  // } else {
  //   console.log('взято из памяти');
  //   getDataGlobalFromLocal();
  // }
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();
  if(day < 10) {
		document.getElementById('dd').innerText = '0' + day;
  } else document.getElementById('dd').innerText = day;
  if(month < 10) {
		document.getElementById('mm').innerText = '0' + month;
  } else document.getElementById('mm').innerText = month;
  document.getElementById('yy').innerText = year;
  if(hour < 10) {
		document.getElementById('hours').innerText = '0' + hour;
		} else document.getElementById('hours').innerText = hour;
	if(min < 10) {
		document.getElementById('minutes').innerText = '0' + min;
		} else document.getElementById('minutes').innerText = min;

  getGlobalData();
  // addToDOM();
}

async function getGlobalData() {
  const url = 'https://api.covid19api.com/summary';
  const res = await fetch(url);
  data = await res.json();
  //get data global
  objDataGlobal.totalConfirmed = data.Global.TotalConfirmed;
  objDataGlobal.totalRecovered = data.Global.TotalRecovered;
  objDataGlobal.totalDeaths = data.Global.TotalDeaths;
  //get data last day
  objDataGlobal.newConfirmed = data.Global.NewConfirmed;
  objDataGlobal.newRecovered = data.Global.NewRecovered;
  objDataGlobal.newDeaths = data.Global.NewDeaths;
  //get data by country
  objDataGlobal.countries = data.Countries;
  addToDOM();
}

function setGlobalDataToLocal() {
  //data last day and global
  const totalConfirmed = objDataGlobal.totalConfirmed;
  const totalRecovered = objDataGlobal.totalRecovered;
  const totalDeaths = objDataGlobal.totalDeaths;
  const newConfirmed = objDataGlobal.newConfirmed;
  const newRecovered = objDataGlobal.newRecovered;
  const newDeaths = objDataGlobal.newDeaths;
  //save in LocalStorage
	localStorage.setItem('totalConfirmed', totalConfirmed);
  localStorage.setItem('totalRecovered', totalRecovered);
  localStorage.setItem('totalDeaths', totalDeaths);
  localStorage.setItem('newConfirmed', newConfirmed);
  localStorage.setItem('newRecovered', newRecovered);
  localStorage.setItem('newDeaths', newDeaths);
}

function getDataGlobalFromLocal() {
  //get data global
  objDataGlobal.totalConfirmed = localStorage.getItem('totalConfirmed');
  objDataGlobal.totalRecovered = localStorage.getItem('totalRecovered');
  objDataGlobal.totalDeaths = localStorage.getItem('totalDeaths');
  //get data last day
  objDataGlobal.newConfirmed = localStorage.getItem('newConfirmed');
  objDataGlobal.newRecovered = localStorage.getItem('newRecovered');
  objDataGlobal.newDeaths = localStorage.getItem('newDeaths');
}

function addToDOM() {
  const countPeopleAll = 7827000000;
  const countPeople = countPeopleAll / 100000;
  //data global per 100 thousand population
  const totalConfirmedForPeople = Math.round(objDataGlobal.totalConfirmed / countPeople);
  const totalRecoveredForPeople = Math.round(objDataGlobal.totalRecovered / countPeople);
  const totalDeathsForPeople = Math.round(objDataGlobal.totalDeaths / countPeople);

  //data last day per 100 thousand population
  const newConfirmedForPeople = Math.round(objDataGlobal.newConfirmed / countPeople);
  const newRecoveredForPeople = Math.round(objDataGlobal.newRecovered / countPeople);
  const newDeathsForPeople = Math.round(objDataGlobal.newDeaths / countPeople);

  arrData = [
    [objDataGlobal.totalConfirmed, objDataGlobal.totalRecovered, objDataGlobal.totalDeaths, 'Global for the world', '(absolute values)'],
    [objDataGlobal.newConfirmed, objDataGlobal.newRecovered, objDataGlobal.newDeaths, 'Global for the last day', '(absolute values)'],
    [totalConfirmedForPeople, totalRecoveredForPeople , totalDeathsForPeople, 'Global for the world', '(per 100 thousand population)'],
    [newConfirmedForPeople, newRecoveredForPeople, newDeathsForPeople, 'Global for the last day', '(per 100 thousand population)']
  ];

  //add data to DOM
  let dataCases = document.querySelector('.data-cases p');
  let dataRecovered = document.querySelector('.data-recovered p');
  let dataDeaths = document.querySelector('.data-deaths p');
  let headerWidget = document.querySelector('.global h3');
  let headerWidgetNote = document.querySelector('.note');

  //value default - global
  const startIndex = 0;
  addContentGlobalDate(startIndex);

  //select other global data
  selectData();
  function selectData() {
    let index = 0;
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    next.addEventListener('click', function() {
      if(index === 3) {
        index = 0;
      } else {
        index ++;
      }
      addContentGlobalDate(index);
    });
    prev.addEventListener('click', function() {
      if(index === 0) {
        index = 3;
      } else {
        index --;
      }
      addContentGlobalDate(index);
    });
  }
  function addContentGlobalDate(index) {
    dataCases.textContent = arrData[index][0].toLocaleString();
    dataRecovered.textContent = arrData[index][1].toLocaleString();
    dataDeaths.textContent = arrData[index][2].toLocaleString();
    headerWidget.textContent = arrData[index][3].toLocaleString();
    headerWidgetNote.textContent = arrData[index][4].toLocaleString();
  }


  //add list countries
  let parentCountries = document.querySelector('.countries');
  const countCountries = objDataGlobal.countries.length;
  for (let i = 0; i < countCountries; i++) {
    let itemList = document.createElement('li');
    itemList.classList.add('item-country');
    itemList.setAttribute('data-id', i);
    parentCountries.appendChild(itemList);
  }
  let listCountries = document.querySelectorAll('.countries .item-country');
  listCountries.forEach((item, i) => {
    // item.setAttribute('data-id', objDataGlobal.countries[i].ID);
    let arrWork = objDataGlobal.countries;
    arrWork.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
    item.textContent = arrWork[i].Country;

    let cMarker = arrWork[i].Country;
    console.log(cMarker);
    console.log(_dataCountry__WEBPACK_IMPORTED_MODULE_0__.dataCountry.filter((item) => item.name === cMarker)[0].flag);
    const flag = _dataCountry__WEBPACK_IMPORTED_MODULE_0__.dataCountry.filter((item) => item.name === cMarker)[0].flag;
    let itemFlag = document.createElement('span');
    itemFlag.classList.add('flag-country');
    item.prepend(itemFlag);
    itemFlag.style.background = `url(${flag}) no-repeat left center`;
    itemFlag.style.backgroundSize = 'cover';

    const countForItem = document.createElement('span');
    item.appendChild(countForItem);
    countForItem.textContent = ' - ' + arrWork[i].TotalConfirmed.toLocaleString();
  });


  //get data by country for click
  parentCountries.addEventListener('click', function(event) {
    let target = event.target;
    while(target !== parentCountries) {
      if(target.tagName === 'LI') {
          console.log(target);
          const i = target.getAttribute('data-id');
          console.log('ID - ', i);
          viewDataForCountry(i);
          return;
      };
      target = target.parentElement;
    }
  })

  function viewDataForCountry(i) {
    console.log(objDataGlobal.countries[i]);
    let item = objDataGlobal.countries[i];

    const countPeopleAll = 7827000000;
    const countPeople = countPeopleAll / 100000;
    //data global per 100 thousand population
    const totalConfirmedForPeople = Math.round(item.TotalConfirmed / countPeople);
    const totalRecoveredForPeople = Math.round(item.TotalRecovere / countPeople);
    const totalDeathsForPeople = Math.round(item.TotalDeaths / countPeople);

    //data last day per 100 thousand population
    const newConfirmedForPeople = Math.round(objDataGlobal.newConfirmed / countPeople);
    const newRecoveredForPeople = Math.round(objDataGlobal.newRecovered / countPeople);
    const newDeathsForPeople = Math.round(objDataGlobal.newDeaths / countPeople);

    arrData = [
      [item.TotalConfirmed, item.TotalRecovered, item.TotalDeaths, 'Global for the world', '(absolute values)'],
      [item.NewConfirmed, item.NewRecovered, item.NewDeaths, 'Global for the last day', '(absolute values)'],
      [totalConfirmedForPeople, totalRecoveredForPeople , totalDeathsForPeople, 'Global for the world', '(per 100 thousand population)'],
      [newConfirmedForPeople, newRecoveredForPeople, newDeathsForPeople, 'Global for the last day', '(per 100 thousand population)']
    ];

    const startIndex = 0;
    addContentGlobalDate(startIndex);

    //select other global data
    selectData();
  }
}


/***/ }),

/***/ "./src/assets/js/country-codes.js":
/*!****************************************!*\
  !*** ./src/assets/js/country-codes.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "country_codes": () => /* binding */ country_codes
/* harmony export */ });
const country_codes = [{
  country: 'Albania',
  alpha2: 'AL',
  alpha3: 'ALB',
  numeric: 8,
  latitude: 41,
  longitude: 20,
},
{
  country: 'Algeria',
  alpha2: 'DZ',
  alpha3: 'DZA',
  numeric: 12,
  latitude: 28,
  longitude: 3,
},
{
  country: 'American Samoa',
  alpha2: 'AS',
  alpha3: 'ASM',
  numeric: 16,
  latitude: -14.3333,
  longitude: -170,
},
{
  country: 'Andorra',
  alpha2: 'AD',
  alpha3: 'AND',
  numeric: 20,
  latitude: 42.5,
  longitude: 1.6,
},
{
  country: 'Angola',
  alpha2: 'AO',
  alpha3: 'AGO',
  numeric: 24,
  latitude: -12.5,
  longitude: 18.5,
},
{
  country: 'Anguilla',
  alpha2: 'AI',
  alpha3: 'AIA',
  numeric: 660,
  latitude: 18.25,
  longitude: -63.1667,
},
{
  country: 'Antarctica',
  alpha2: 'AQ',
  alpha3: 'ATA',
  numeric: 10,
  latitude: -90,
  longitude: 0,
},
{
  country: 'Antigua and Barbuda',
  alpha2: 'AG',
  alpha3: 'ATG',
  numeric: 28,
  latitude: 17.05,
  longitude: -61.8,
},
{
  country: 'Argentina',
  alpha2: 'AR',
  alpha3: 'ARG',
  numeric: 32,
  latitude: -34,
  longitude: -64,
},
{
  country: 'Armenia',
  alpha2: 'AM',
  alpha3: 'ARM',
  numeric: 51,
  latitude: 40,
  longitude: 45,
},
{
  country: 'Aruba',
  alpha2: 'AW',
  alpha3: 'ABW',
  numeric: 533,
  latitude: 12.5,
  longitude: -69.9667,
},
{
  country: 'Australia',
  alpha2: 'AU',
  alpha3: 'AUS',
  numeric: 36,
  latitude: -27,
  longitude: 133,
},
{
  country: 'Austria',
  alpha2: 'AT',
  alpha3: 'AUT',
  numeric: 40,
  latitude: 47.3333,
  longitude: 13.3333,
},
{
  country: 'Azerbaijan',
  alpha2: 'AZ',
  alpha3: 'AZE',
  numeric: 31,
  latitude: 40.5,
  longitude: 47.5,
},
{
  country: 'Bahamas',
  alpha2: 'BS',
  alpha3: 'BHS',
  numeric: 44,
  latitude: 24.25,
  longitude: -76,
},
{
  country: 'Bahrain',
  alpha2: 'BH',
  alpha3: 'BHR',
  numeric: 48,
  latitude: 26,
  longitude: 50.55,
},
{
  country: 'Bangladesh',
  alpha2: 'BD',
  alpha3: 'BGD',
  numeric: 50,
  latitude: 24,
  longitude: 90,
},
{
  country: 'Barbados',
  alpha2: 'BB',
  alpha3: 'BRB',
  numeric: 52,
  latitude: 13.1667,
  longitude: -59.5333,
},
{
  country: 'Belarus',
  alpha2: 'BY',
  alpha3: 'BLR',
  numeric: 112,
  latitude: 53,
  longitude: 28,
},
{
  country: 'Belgium',
  alpha2: 'BE',
  alpha3: 'BEL',
  numeric: 56,
  latitude: 50.8333,
  longitude: 4,
},
{
  country: 'Belize',
  alpha2: 'BZ',
  alpha3: 'BLZ',
  numeric: 84,
  latitude: 17.25,
  longitude: -88.75,
},
{
  country: 'Benin',
  alpha2: 'BJ',
  alpha3: 'BEN',
  numeric: 204,
  latitude: 9.5,
  longitude: 2.25,
},
{
  country: 'Bermuda',
  alpha2: 'BM',
  alpha3: 'BMU',
  numeric: 60,
  latitude: 32.3333,
  longitude: -64.75,
},
{
  country: 'Bhutan',
  alpha2: 'BT',
  alpha3: 'BTN',
  numeric: 64,
  latitude: 27.5,
  longitude: 90.5,
},
{
  country: 'Bolivia',
  alpha2: 'BO',
  alpha3: 'BOL',
  numeric: 68,
  latitude: -17,
  longitude: -65,
},
{
  country: 'Bosnia and Herzegovina',
  alpha2: 'BA',
  alpha3: 'BIH',
  numeric: 70,
  latitude: 44,
  longitude: 18,
},
{
  country: 'Botswana',
  alpha2: 'BW',
  alpha3: 'BWA',
  numeric: 72,
  latitude: -22,
  longitude: 24,
},
{
  country: 'Bouvet Island',
  alpha2: 'BV',
  alpha3: 'BVT',
  numeric: 74,
  latitude: -54.4333,
  longitude: 3.4,
},
{
  country: 'Brazil',
  alpha2: 'BR',
  alpha3: 'BRA',
  numeric: 76,
  latitude: -10,
  longitude: -55,
},
{
  country: 'British Indian Ocean Territory',
  alpha2: 'IO',
  alpha3: 'IOT',
  numeric: 86,
  latitude: -6,
  longitude: 71.5,
},
{
  country: 'Brunei Darussalam',
  alpha2: 'BN',
  alpha3: 'BRN',
  numeric: 96,
  latitude: 4.5,
  longitude: 114.6667,
},
{
  country: 'Bulgaria',
  alpha2: 'BG',
  alpha3: 'BGR',
  numeric: 100,
  latitude: 43,
  longitude: 25,
},
{
  country: 'Burkina Faso',
  alpha2: 'BF',
  alpha3: 'BFA',
  numeric: 854,
  latitude: 13,
  longitude: -2,
},
{
  country: 'Burundi',
  alpha2: 'BI',
  alpha3: 'BDI',
  numeric: 108,
  latitude: -3.5,
  longitude: 30,
},
{
  country: 'Cambodia',
  alpha2: 'KH',
  alpha3: 'KHM',
  numeric: 116,
  latitude: 13,
  longitude: 105,
},
{
  country: 'Cameroon',
  alpha2: 'CM',
  alpha3: 'CMR',
  numeric: 120,
  latitude: 6,
  longitude: 12,
},
{
  country: 'Canada',
  alpha2: 'CA',
  alpha3: 'CAN',
  numeric: 124,
  latitude: 60,
  longitude: -95,
},
{
  country: 'Cape Verde',
  alpha2: 'CV',
  alpha3: 'CPV',
  numeric: 132,
  latitude: 16,
  longitude: -24,
},
{
  country: 'Cayman Islands',
  alpha2: 'KY',
  alpha3: 'CYM',
  numeric: 136,
  latitude: 19.5,
  longitude: -80.5,
},
{
  country: 'Central African Republic',
  alpha2: 'CF',
  alpha3: 'CAF',
  numeric: 140,
  latitude: 7,
  longitude: 21,
},
{
  country: 'Chad',
  alpha2: 'TD',
  alpha3: 'TCD',
  numeric: 148,
  latitude: 15,
  longitude: 19,
},
{
  country: 'Chile',
  alpha2: 'CL',
  alpha3: 'CHL',
  numeric: 152,
  latitude: -30,
  longitude: -71,
},
{
  country: 'China',
  alpha2: 'CN',
  alpha3: 'CHN',
  numeric: 156,
  latitude: 35,
  longitude: 105,
},
{
  country: 'Christmas Island',
  alpha2: 'CX',
  alpha3: 'CXR',
  numeric: 162,
  latitude: -10.5,
  longitude: 105.6667,
},
{
  country: 'Cocos (Keeling) Islands',
  alpha2: 'CC',
  alpha3: 'CCK',
  numeric: 166,
  latitude: -12.5,
  longitude: 96.8333,
},
{
  country: 'Colombia',
  alpha2: 'CO',
  alpha3: 'COL',
  numeric: 170,
  latitude: 4,
  longitude: -72,
},
{
  country: 'Comoros',
  alpha2: 'KM',
  alpha3: 'COM',
  numeric: 174,
  latitude: -12.1667,
  longitude: 44.25,
},
{
  country: 'Congo (Brazzaville)',
  alpha2: 'CG',
  alpha3: 'COG',
  numeric: 178,
  latitude: -1,
  longitude: 15,
},
{
  country: 'Congo (Kinshasa)',
  alpha2: 'CD',
  alpha3: 'COD',
  numeric: 180,
  latitude: 0,
  longitude: 25,
},
{
  country: 'Cook Islands',
  alpha2: 'CK',
  alpha3: 'COK',
  numeric: 184,
  latitude: -21.2333,
  longitude: -159.7667,
},
{
  country: 'Costa Rica',
  alpha2: 'CR',
  alpha3: 'CRI',
  numeric: 188,
  latitude: 10,
  longitude: -84,
},
{
  country: "Côte d'Ivoire",
  alpha2: 'CI',
  alpha3: 'CIV',
  numeric: 384,
  latitude: 8,
  longitude: -5,
},
{
  country: 'Croatia',
  alpha2: 'HR',
  alpha3: 'HRV',
  numeric: 191,
  latitude: 45.1667,
  longitude: 15.5,
},
{
  country: 'Cuba',
  alpha2: 'CU',
  alpha3: 'CUB',
  numeric: 192,
  latitude: 21.5,
  longitude: -80,
},
{
  country: 'Cyprus',
  alpha2: 'CY',
  alpha3: 'CYP',
  numeric: 196,
  latitude: 35,
  longitude: 33,
},
{
  country: 'Czech Republic',
  alpha2: 'CZ',
  alpha3: 'CZE',
  numeric: 203,
  latitude: 49.75,
  longitude: 15.5,
},
{
  country: 'Denmark',
  alpha2: 'DK',
  alpha3: 'DNK',
  numeric: 208,
  latitude: 56,
  longitude: 10,
},
{
  country: 'Djibouti',
  alpha2: 'DJ',
  alpha3: 'DJI',
  numeric: 262,
  latitude: 11.5,
  longitude: 43,
},
{
  country: 'Dominica',
  alpha2: 'DM',
  alpha3: 'DMA',
  numeric: 212,
  latitude: 15.4167,
  longitude: -61.3333,
},
{
  country: 'Dominican Republic',
  alpha2: 'DO',
  alpha3: 'DOM',
  numeric: 214,
  latitude: 19,
  longitude: -70.6667,
},
{
  country: 'Ecuador',
  alpha2: 'EC',
  alpha3: 'ECU',
  numeric: 218,
  latitude: -2,
  longitude: -77.5,
},
{
  country: 'Egypt',
  alpha2: 'EG',
  alpha3: 'EGY',
  numeric: 818,
  latitude: 27,
  longitude: 30,
},
{
  country: 'El Salvador',
  alpha2: 'SV',
  alpha3: 'SLV',
  numeric: 222,
  latitude: 13.8333,
  longitude: -88.9167,
},
{
  country: 'Equatorial Guinea',
  alpha2: 'GQ',
  alpha3: 'GNQ',
  numeric: 226,
  latitude: 2,
  longitude: 10,
},
{
  country: 'Eritrea',
  alpha2: 'ER',
  alpha3: 'ERI',
  numeric: 232,
  latitude: 15,
  longitude: 39,
},
{
  country: 'Estonia',
  alpha2: 'EE',
  alpha3: 'EST',
  numeric: 233,
  latitude: 59,
  longitude: 26,
},
{
  country: 'Ethiopia',
  alpha2: 'ET',
  alpha3: 'ETH',
  numeric: 231,
  latitude: 8,
  longitude: 38,
},
{
  country: 'Falkland Islands (Malvinas)',
  alpha2: 'FK',
  alpha3: 'FLK',
  numeric: 238,
  latitude: -51.75,
  longitude: -59,
},
{
  country: 'Faroe Islands',
  alpha2: 'FO',
  alpha3: 'FRO',
  numeric: 234,
  latitude: 62,
  longitude: -7,
},
{
  country: 'Fiji',
  alpha2: 'FJ',
  alpha3: 'FJI',
  numeric: 242,
  latitude: -18,
  longitude: 175,
},
{
  country: 'Finland',
  alpha2: 'FI',
  alpha3: 'FIN',
  numeric: 246,
  latitude: 64,
  longitude: 26,
},
{
  country: 'France',
  alpha2: 'FR',
  alpha3: 'FRA',
  numeric: 250,
  latitude: 46,
  longitude: 2,
},
{
  country: 'French Guiana',
  alpha2: 'GF',
  alpha3: 'GUF',
  numeric: 254,
  latitude: 4,
  longitude: -53,
},
{
  country: 'French Polynesia',
  alpha2: 'PF',
  alpha3: 'PYF',
  numeric: 258,
  latitude: -15,
  longitude: -140,
},
{
  country: 'French Southern Territories',
  alpha2: 'TF',
  alpha3: 'ATF',
  numeric: 260,
  latitude: -43,
  longitude: 67,
},
{
  country: 'Gabon',
  alpha2: 'GA',
  alpha3: 'GAB',
  numeric: 266,
  latitude: -1,
  longitude: 11.75,
},
{
  country: 'Gambia',
  alpha2: 'GM',
  alpha3: 'GMB',
  numeric: 270,
  latitude: 13.4667,
  longitude: -16.5667,
},
{
  country: 'Georgia',
  alpha2: 'GE',
  alpha3: 'GEO',
  numeric: 268,
  latitude: 42,
  longitude: 43.5,
},
{
  country: 'Germany',
  alpha2: 'DE',
  alpha3: 'DEU',
  numeric: 276,
  latitude: 51,
  longitude: 9,
},
{
  country: 'Ghana',
  alpha2: 'GH',
  alpha3: 'GHA',
  numeric: 288,
  latitude: 8,
  longitude: -2,
},
{
  country: 'Gibraltar',
  alpha2: 'GI',
  alpha3: 'GIB',
  numeric: 292,
  latitude: 36.1833,
  longitude: -5.3667,
},
{
  country: 'Greece',
  alpha2: 'GR',
  alpha3: 'GRC',
  numeric: 300,
  latitude: 39,
  longitude: 22,
},
{
  country: 'Greenland',
  alpha2: 'GL',
  alpha3: 'GRL',
  numeric: 304,
  latitude: 72,
  longitude: -40,
},
{
  country: 'Grenada',
  alpha2: 'GD',
  alpha3: 'GRD',
  numeric: 308,
  latitude: 12.1167,
  longitude: -61.6667,
},
{
  country: 'Guadeloupe',
  alpha2: 'GP',
  alpha3: 'GLP',
  numeric: 312,
  latitude: 16.25,
  longitude: -61.5833,
},
{
  country: 'Guam',
  alpha2: 'GU',
  alpha3: 'GUM',
  numeric: 316,
  latitude: 13.4667,
  longitude: 144.7833,
},
{
  country: 'Guatemala',
  alpha2: 'GT',
  alpha3: 'GTM',
  numeric: 320,
  latitude: 15.5,
  longitude: -90.25,
},
{
  country: 'Guernsey',
  alpha2: 'GG',
  alpha3: 'GGY',
  numeric: 831,
  latitude: 49.5,
  longitude: -2.56,
},
{
  country: 'Guinea',
  alpha2: 'GN',
  alpha3: 'GIN',
  numeric: 324,
  latitude: 11,
  longitude: -10,
},
{
  country: 'Guinea-Bissau',
  alpha2: 'GW',
  alpha3: 'GNB',
  numeric: 624,
  latitude: 12,
  longitude: -15,
},
{
  country: 'Guyana',
  alpha2: 'GY',
  alpha3: 'GUY',
  numeric: 328,
  latitude: 5,
  longitude: -59,
},
{
  country: 'Haiti',
  alpha2: 'HT',
  alpha3: 'HTI',
  numeric: 332,
  latitude: 19,
  longitude: -72.4167,
},
{
  country: 'Heard Island and McDonald Islands',
  alpha2: 'HM',
  alpha3: 'HMD',
  numeric: 334,
  latitude: -53.1,
  longitude: 72.5167,
},
{
  country: 'Holy See (Vatican City State)',
  alpha2: 'VA',
  alpha3: 'VAT',
  numeric: 336,
  latitude: 41.9,
  longitude: 12.45,
},
{
  country: 'Honduras',
  alpha2: 'HN',
  alpha3: 'HND',
  numeric: 340,
  latitude: 15,
  longitude: -86.5,
},
{
  country: 'Hong Kong',
  alpha2: 'HK',
  alpha3: 'HKG',
  numeric: 344,
  latitude: 22.25,
  longitude: 114.1667,
},
{
  country: 'Hungary',
  alpha2: 'HU',
  alpha3: 'HUN',
  numeric: 348,
  latitude: 47,
  longitude: 20,
},
{
  country: 'Iceland',
  alpha2: 'IS',
  alpha3: 'ISL',
  numeric: 352,
  latitude: 65,
  longitude: -18,
},
{
  country: 'India',
  alpha2: 'IN',
  alpha3: 'IND',
  numeric: 356,
  latitude: 20,
  longitude: 77,
},
{
  country: 'Indonesia',
  alpha2: 'ID',
  alpha3: 'IDN',
  numeric: 360,
  latitude: -5,
  longitude: 120,
},
{
  country: 'Republic of Kosovo',
  alpha2: 'KS',
  alpha3: 'KOS',
  numeric: 3620,
  latitude: 42.6639,
  longitude: 21.0961,
},
{
  country: 'Iran, Islamic Republic of',
  alpha2: 'IR',
  alpha3: 'IRN',
  numeric: 364,
  latitude: 32,
  longitude: 53,
},
{
  country: 'Iraq',
  alpha2: 'IQ',
  alpha3: 'IRQ',
  numeric: 368,
  latitude: 33,
  longitude: 44,
},
{
  country: 'Ireland',
  alpha2: 'IE',
  alpha3: 'IRL',
  numeric: 372,
  latitude: 53,
  longitude: -8,
},
{
  country: 'Isle of Man',
  alpha2: 'IM',
  alpha3: 'IMN',
  numeric: 833,
  latitude: 54.23,
  longitude: -4.55,
},
{
  country: 'Israel',
  alpha2: 'IL',
  alpha3: 'ISR',
  numeric: 376,
  latitude: 31.5,
  longitude: 34.75,
},
{
  country: 'Italy',
  alpha2: 'IT',
  alpha3: 'ITA',
  numeric: 380,
  latitude: 42.8333,
  longitude: 12.8333,
},
{
  country: 'Jamaica',
  alpha2: 'JM',
  alpha3: 'JAM',
  numeric: 388,
  latitude: 18.25,
  longitude: -77.5,
},
{
  country: 'Japan',
  alpha2: 'JP',
  alpha3: 'JPN',
  numeric: 392,
  latitude: 36,
  longitude: 138,
},
{
  country: 'Jersey',
  alpha2: 'JE',
  alpha3: 'JEY',
  numeric: 832,
  latitude: 49.21,
  longitude: -2.13,
},
{
  country: 'Jordan',
  alpha2: 'JO',
  alpha3: 'JOR',
  numeric: 400,
  latitude: 31,
  longitude: 36,
},
{
  country: 'Kazakhstan',
  alpha2: 'KZ',
  alpha3: 'KAZ',
  numeric: 398,
  latitude: 48,
  longitude: 68,
},
{
  country: 'Kenya',
  alpha2: 'KE',
  alpha3: 'KEN',
  numeric: 404,
  latitude: 1,
  longitude: 38,
},
{
  country: 'Kiribati',
  alpha2: 'KI',
  alpha3: 'KIR',
  numeric: 296,
  latitude: 1.4167,
  longitude: 173,
},
{
  country: "Korea, Democratic People's Republic of",
  alpha2: 'KP',
  alpha3: 'PRK',
  numeric: 408,
  latitude: 40,
  longitude: 127,
},
{
  country: 'Korea (South)',
  alpha2: 'KR',
  alpha3: 'KOR',
  numeric: 410,
  latitude: 37,
  longitude: 127.5,
},
{
  country: 'Kuwait',
  alpha2: 'KW',
  alpha3: 'KWT',
  numeric: 414,
  latitude: 29.3375,
  longitude: 47.6581,
},
{
  country: 'Kyrgyzstan',
  alpha2: 'KG',
  alpha3: 'KGZ',
  numeric: 417,
  latitude: 41,
  longitude: 75,
},
{
  country: 'Lao PDR',
  alpha2: 'LA',
  alpha3: 'LAO',
  numeric: 418,
  latitude: 18,
  longitude: 105,
},
{
  country: 'Latvia',
  alpha2: 'LV',
  alpha3: 'LVA',
  numeric: 428,
  latitude: 57,
  longitude: 25,
},
{
  country: 'Lebanon',
  alpha2: 'LB',
  alpha3: 'LBN',
  numeric: 422,
  latitude: 33.8333,
  longitude: 35.8333,
},
{
  country: 'Lesotho',
  alpha2: 'LS',
  alpha3: 'LSO',
  numeric: 426,
  latitude: -29.5,
  longitude: 28.5,
},
{
  country: 'Liberia',
  alpha2: 'LR',
  alpha3: 'LBR',
  numeric: 430,
  latitude: 6.5,
  longitude: -9.5,
},
{
  country: 'Libya',
  alpha2: 'LY',
  alpha3: 'LBY',
  numeric: 434,
  latitude: 25,
  longitude: 17,
},
{
  country: 'Liechtenstein',
  alpha2: 'LI',
  alpha3: 'LIE',
  numeric: 438,
  latitude: 47.1667,
  longitude: 9.5333,
},
{
  country: 'Lithuania',
  alpha2: 'LT',
  alpha3: 'LTU',
  numeric: 440,
  latitude: 56,
  longitude: 24,
},
{
  country: 'Luxembourg',
  alpha2: 'LU',
  alpha3: 'LUX',
  numeric: 442,
  latitude: 49.75,
  longitude: 6.1667,
},
{
  country: 'Macao, SAR China',
  alpha2: 'MO',
  alpha3: 'MAC',
  numeric: 446,
  latitude: 22.1667,
  longitude: 113.55,
},
{
  country: 'Macedonia, Republic of',
  alpha2: 'MK',
  alpha3: 'MKD',
  numeric: 807,
  latitude: 41.8333,
  longitude: 22,
},
{
  country: 'Madagascar',
  alpha2: 'MG',
  alpha3: 'MDG',
  numeric: 450,
  latitude: -20,
  longitude: 47,
},
{
  country: 'Malawi',
  alpha2: 'MW',
  alpha3: 'MWI',
  numeric: 454,
  latitude: -13.5,
  longitude: 34,
},
{
  country: 'Malaysia',
  alpha2: 'MY',
  alpha3: 'MYS',
  numeric: 458,
  latitude: 2.5,
  longitude: 112.5,
},
{
  country: 'Maldives',
  alpha2: 'MV',
  alpha3: 'MDV',
  numeric: 462,
  latitude: 3.25,
  longitude: 73,
},
{
  country: 'Mali',
  alpha2: 'ML',
  alpha3: 'MLI',
  numeric: 466,
  latitude: 17,
  longitude: -4,
},
{
  country: 'Malta',
  alpha2: 'MT',
  alpha3: 'MLT',
  numeric: 470,
  latitude: 35.8333,
  longitude: 14.5833,
},
{
  country: 'Marshall Islands',
  alpha2: 'MH',
  alpha3: 'MHL',
  numeric: 584,
  latitude: 9,
  longitude: 168,
},
{
  country: 'Martinique',
  alpha2: 'MQ',
  alpha3: 'MTQ',
  numeric: 474,
  latitude: 14.6667,
  longitude: -61,
},
{
  country: 'Mauritania',
  alpha2: 'MR',
  alpha3: 'MRT',
  numeric: 478,
  latitude: 20,
  longitude: -12,
},
{
  country: 'Mauritius',
  alpha2: 'MU',
  alpha3: 'MUS',
  numeric: 480,
  latitude: -20.2833,
  longitude: 57.55,
},
{
  country: 'Mayotte',
  alpha2: 'YT',
  alpha3: 'MYT',
  numeric: 175,
  latitude: -12.8333,
  longitude: 45.1667,
},
{
  country: 'Mexico',
  alpha2: 'MX',
  alpha3: 'MEX',
  numeric: 484,
  latitude: 23,
  longitude: -102,
},
{
  country: 'Micronesia, Federated States of',
  alpha2: 'FM',
  alpha3: 'FSM',
  numeric: 583,
  latitude: 6.9167,
  longitude: 158.25,
},
{
  country: 'Moldova',
  alpha2: 'MD',
  alpha3: 'MDA',
  numeric: 498,
  latitude: 47,
  longitude: 29,
},
{
  country: 'Monaco',
  alpha2: 'MC',
  alpha3: 'MCO',
  numeric: 492,
  latitude: 43.7333,
  longitude: 7.4,
},
{
  country: 'Mongolia',
  alpha2: 'MN',
  alpha3: 'MNG',
  numeric: 496,
  latitude: 46,
  longitude: 105,
},
{
  country: 'Montenegro',
  alpha2: 'ME',
  alpha3: 'MNE',
  numeric: 499,
  latitude: 42,
  longitude: 19,
},
{
  country: 'Montserrat',
  alpha2: 'MS',
  alpha3: 'MSR',
  numeric: 500,
  latitude: 16.75,
  longitude: -62.2,
},
{
  country: 'Morocco',
  alpha2: 'MA',
  alpha3: 'MAR',
  numeric: 504,
  latitude: 32,
  longitude: -5,
},
{
  country: 'Mozambique',
  alpha2: 'MZ',
  alpha3: 'MOZ',
  numeric: 508,
  latitude: -18.25,
  longitude: 35,
},
{
  country: 'Myanmar',
  alpha2: 'MM',
  alpha3: 'MMR',
  numeric: 104,
  latitude: 22,
  longitude: 98,
},
{
  country: 'Namibia',
  alpha2: 'NA',
  alpha3: 'NAM',
  numeric: 516,
  latitude: -22,
  longitude: 17,
},
{
  country: 'Nauru',
  alpha2: 'NR',
  alpha3: 'NRU',
  numeric: 520,
  latitude: -0.5333,
  longitude: 166.9167,
},
{
  country: 'Nepal',
  alpha2: 'NP',
  alpha3: 'NPL',
  numeric: 524,
  latitude: 28,
  longitude: 84,
},
{
  country: 'Netherlands',
  alpha2: 'NL',
  alpha3: 'NLD',
  numeric: 528,
  latitude: 52.5,
  longitude: 5.75,
},
{
  country: 'Netherlands Antilles',
  alpha2: 'AN',
  alpha3: 'ANT',
  numeric: 530,
  latitude: 12.25,
  longitude: -68.75,
},
{
  country: 'New Caledonia',
  alpha2: 'NC',
  alpha3: 'NCL',
  numeric: 540,
  latitude: -21.5,
  longitude: 165.5,
},
{
  country: 'New Zealand',
  alpha2: 'NZ',
  alpha3: 'NZL',
  numeric: 554,
  latitude: -41,
  longitude: 174,
},
{
  country: 'Nicaragua',
  alpha2: 'NI',
  alpha3: 'NIC',
  numeric: 558,
  latitude: 13,
  longitude: -85,
},
{
  country: 'Niger',
  alpha2: 'NE',
  alpha3: 'NER',
  numeric: 562,
  latitude: 16,
  longitude: 8,
},
{
  country: 'Nigeria',
  alpha2: 'NG',
  alpha3: 'NGA',
  numeric: 566,
  latitude: 10,
  longitude: 8,
},
{
  country: 'Niue',
  alpha2: 'NU',
  alpha3: 'NIU',
  numeric: 570,
  latitude: -19.0333,
  longitude: -169.8667,
},
{
  country: 'Norfolk Island',
  alpha2: 'NF',
  alpha3: 'NFK',
  numeric: 574,
  latitude: -29.0333,
  longitude: 167.95,
},
{
  country: 'Northern Mariana Islands',
  alpha2: 'MP',
  alpha3: 'MNP',
  numeric: 580,
  latitude: 15.2,
  longitude: 145.75,
},
{
  country: 'Norway',
  alpha2: 'NO',
  alpha3: 'NOR',
  numeric: 578,
  latitude: 62,
  longitude: 10,
},
{
  country: 'Oman',
  alpha2: 'OM',
  alpha3: 'OMN',
  numeric: 512,
  latitude: 21,
  longitude: 57,
},
{
  country: 'Pakistan',
  alpha2: 'PK',
  alpha3: 'PAK',
  numeric: 586,
  latitude: 30,
  longitude: 70,
},
{
  country: 'Palau',
  alpha2: 'PW',
  alpha3: 'PLW',
  numeric: 585,
  latitude: 7.5,
  longitude: 134.5,
},
{
  country: 'Palestinian Territory',
  alpha2: 'PS',
  alpha3: 'PSE',
  numeric: 275,
  latitude: 32,
  longitude: 35.25,
},
{
  country: 'Panama',
  alpha2: 'PA',
  alpha3: 'PAN',
  numeric: 591,
  latitude: 9,
  longitude: -80,
},
{
  country: 'Papua New Guinea',
  alpha2: 'PG',
  alpha3: 'PNG',
  numeric: 598,
  latitude: -6,
  longitude: 147,
},
{
  country: 'Paraguay',
  alpha2: 'PY',
  alpha3: 'PRY',
  numeric: 600,
  latitude: -23,
  longitude: -58,
},
{
  country: 'Peru',
  alpha2: 'PE',
  alpha3: 'PER',
  numeric: 604,
  latitude: -10,
  longitude: -76,
},
{
  country: 'Philippines',
  alpha2: 'PH',
  alpha3: 'PHL',
  numeric: 608,
  latitude: 13,
  longitude: 122,
},
{
  country: 'Pitcairn',
  alpha2: 'PN',
  alpha3: 'PCN',
  numeric: 612,
  latitude: -24.7,
  longitude: -127.4,
},
{
  country: 'Poland',
  alpha2: 'PL',
  alpha3: 'POL',
  numeric: 616,
  latitude: 52,
  longitude: 20,
},
{
  country: 'Portugal',
  alpha2: 'PT',
  alpha3: 'PRT',
  numeric: 620,
  latitude: 39.5,
  longitude: -8,
},
{
  country: 'Puerto Rico',
  alpha2: 'PR',
  alpha3: 'PRI',
  numeric: 630,
  latitude: 18.25,
  longitude: -66.5,
},
{
  country: 'Qatar',
  alpha2: 'QA',
  alpha3: 'QAT',
  numeric: 634,
  latitude: 25.5,
  longitude: 51.25,
},
{
  country: 'Réunion',
  alpha2: 'RE',
  alpha3: 'REU',
  numeric: 638,
  latitude: -21.1,
  longitude: 55.6,
},
{
  country: 'Romania',
  alpha2: 'RO',
  alpha3: 'ROU',
  numeric: 642,
  latitude: 46,
  longitude: 25,
},
{
  country: 'Russian Federation',
  alpha2: 'RU',
  alpha3: 'RUS',
  numeric: 643,
  latitude: 60,
  longitude: 100,
},
{
  country: 'Rwanda',
  alpha2: 'RW',
  alpha3: 'RWA',
  numeric: 646,
  latitude: -2,
  longitude: 30,
},
{
  country: 'Saint Helena, Ascension and Tristan da Cunha',
  alpha2: 'SH',
  alpha3: 'SHN',
  numeric: 654,
  latitude: -15.9333,
  longitude: -5.7,
},
{
  country: 'Saint Kitts and Nevis',
  alpha2: 'KN',
  alpha3: 'KNA',
  numeric: 659,
  latitude: 17.3333,
  longitude: -62.75,
},
{
  country: 'Saint Lucia',
  alpha2: 'LC',
  alpha3: 'LCA',
  numeric: 662,
  latitude: 13.8833,
  longitude: -61.1333,
},
{
  country: 'Saint Pierre and Miquelon',
  alpha2: 'PM',
  alpha3: 'SPM',
  numeric: 666,
  latitude: 46.8333,
  longitude: -56.3333,
},
{
  country: 'Saint Vincent and Grenadines',
  alpha2: 'VC',
  alpha3: 'VCT',
  numeric: 670,
  latitude: 13.25,
  longitude: -61.2,
},
{
  country: 'Samoa',
  alpha2: 'WS',
  alpha3: 'WSM',
  numeric: 882,
  latitude: -13.5833,
  longitude: -172.3333,
},
{
  country: 'San Marino',
  alpha2: 'SM',
  alpha3: 'SMR',
  numeric: 674,
  latitude: 43.7667,
  longitude: 12.4167,
},
{
  country: 'Sao Tome and Principe',
  alpha2: 'ST',
  alpha3: 'STP',
  numeric: 678,
  latitude: 1,
  longitude: 7,
},
{
  country: 'Saudi Arabia',
  alpha2: 'SA',
  alpha3: 'SAU',
  numeric: 682,
  latitude: 25,
  longitude: 45,
},
{
  country: 'Senegal',
  alpha2: 'SN',
  alpha3: 'SEN',
  numeric: 686,
  latitude: 14,
  longitude: -14,
},
{
  country: 'Serbia',
  alpha2: 'RS',
  alpha3: 'SRB',
  numeric: 688,
  latitude: 44,
  longitude: 21,
},
{
  country: 'Seychelles',
  alpha2: 'SC',
  alpha3: 'SYC',
  numeric: 690,
  latitude: -4.5833,
  longitude: 55.6667,
},
{
  country: 'Sierra Leone',
  alpha2: 'SL',
  alpha3: 'SLE',
  numeric: 694,
  latitude: 8.5,
  longitude: -11.5,
},
{
  country: 'Singapore',
  alpha2: 'SG',
  alpha3: 'SGP',
  numeric: 702,
  latitude: 1.3667,
  longitude: 103.8,
},
{
  country: 'Slovakia',
  alpha2: 'SK',
  alpha3: 'SVK',
  numeric: 703,
  latitude: 48.6667,
  longitude: 19.5,
},
{
  country: 'Slovenia',
  alpha2: 'SI',
  alpha3: 'SVN',
  numeric: 705,
  latitude: 46,
  longitude: 15,
},
{
  country: 'Solomon Islands',
  alpha2: 'SB',
  alpha3: 'SLB',
  numeric: 90,
  latitude: -8,
  longitude: 159,
},
{
  country: 'Somalia',
  alpha2: 'SO',
  alpha3: 'SOM',
  numeric: 706,
  latitude: 10,
  longitude: 49,
},
{
  country: 'South Africa',
  alpha2: 'ZA',
  alpha3: 'ZAF',
  numeric: 710,
  latitude: -29,
  longitude: 24,
},
{
  country: 'South Georgia and the South Sandwich Islands',
  alpha2: 'GS',
  alpha3: 'SGS',
  numeric: 239,
  latitude: -54.5,
  longitude: -37,
},
{
  country: 'Spain',
  alpha2: 'ES',
  alpha3: 'ESP',
  numeric: 724,
  latitude: 40,
  longitude: -4,
},
{
  country: 'Sri Lanka',
  alpha2: 'LK',
  alpha3: 'LKA',
  numeric: 144,
  latitude: 7,
  longitude: 81,
},
{
  country: 'Sudan',
  alpha2: 'SD',
  alpha3: 'SDN',
  numeric: 736,
  latitude: 15,
  longitude: 30,
},
{
  country: 'South Sudan',
  alpha2: 'SSD',
  alpha3: 'SDN',
  numeric: 7326,
  latitude: 7.8627,
  longitude: 29.6949,
},
{
  country: 'Suriname',
  alpha2: 'SR',
  alpha3: 'SUR',
  numeric: 740,
  latitude: 4,
  longitude: -56,
},
{
  country: 'Svalbard and Jan Mayen',
  alpha2: 'SJ',
  alpha3: 'SJM',
  numeric: 744,
  latitude: 78,
  longitude: 20,
},
{
  country: 'Swaziland',
  alpha2: 'SZ',
  alpha3: 'SWZ',
  numeric: 748,
  latitude: -26.5,
  longitude: 31.5,
},
{
  country: 'Sweden',
  alpha2: 'SE',
  alpha3: 'SWE',
  numeric: 752,
  latitude: 62,
  longitude: 15,
},
{
  country: 'Switzerland',
  alpha2: 'CH',
  alpha3: 'CHE',
  numeric: 756,
  latitude: 47,
  longitude: 8,
},
{
  country: 'Syrian Arab Republic (Syria)',
  alpha2: 'SY',
  alpha3: 'SYR',
  numeric: 760,
  latitude: 35,
  longitude: 38,
},
{
  country: 'Taiwan, Republic of China',
  alpha2: 'TW',
  alpha3: 'TWN',
  numeric: 158,
  latitude: 23.5,
  longitude: 121,
},
{
  country: 'Tajikistan',
  alpha2: 'TJ',
  alpha3: 'TJK',
  numeric: 762,
  latitude: 39,
  longitude: 71,
},
{
  country: 'Tanzania, United Republic of',
  alpha2: 'TZ',
  alpha3: 'TZA',
  numeric: 834,
  latitude: -6,
  longitude: 35,
},
{
  country: 'Thailand',
  alpha2: 'TH',
  alpha3: 'THA',
  numeric: 764,
  latitude: 15,
  longitude: 100,
},
{
  country: 'Timor-Leste',
  alpha2: 'TL',
  alpha3: 'TLS',
  numeric: 626,
  latitude: -8.55,
  longitude: 125.5167,
},
{
  country: 'Togo',
  alpha2: 'TG',
  alpha3: 'TGO',
  numeric: 768,
  latitude: 8,
  longitude: 1.1667,
},
{
  country: 'Tokelau',
  alpha2: 'TK',
  alpha3: 'TKL',
  numeric: 772,
  latitude: -9,
  longitude: -172,
},
{
  country: 'Tonga',
  alpha2: 'TO',
  alpha3: 'TON',
  numeric: 776,
  latitude: -20,
  longitude: -175,
},
{
  country: 'Trinidad and Tobago',
  alpha2: 'TT',
  alpha3: 'TTO',
  numeric: 780,
  latitude: 11,
  longitude: -61,
},
{
  country: 'Tunisia',
  alpha2: 'TN',
  alpha3: 'TUN',
  numeric: 788,
  latitude: 34,
  longitude: 9,
},
{
  country: 'Turkey',
  alpha2: 'TR',
  alpha3: 'TUR',
  numeric: 792,
  latitude: 39,
  longitude: 35,
},
{
  country: 'Turkmenistan',
  alpha2: 'TM',
  alpha3: 'TKM',
  numeric: 795,
  latitude: 40,
  longitude: 60,
},
{
  country: 'Turks and Caicos Islands',
  alpha2: 'TC',
  alpha3: 'TCA',
  numeric: 796,
  latitude: 21.75,
  longitude: -71.5833,
},
{
  country: 'Tuvalu',
  alpha2: 'TV',
  alpha3: 'TUV',
  numeric: 798,
  latitude: -8,
  longitude: 178,
},
{
  country: 'Uganda',
  alpha2: 'UG',
  alpha3: 'UGA',
  numeric: 800,
  latitude: 1,
  longitude: 32,
},
{
  country: 'Ukraine',
  alpha2: 'UA',
  alpha3: 'UKR',
  numeric: 804,
  latitude: 49,
  longitude: 32,
},
{
  country: 'United Arab Emirates',
  alpha2: 'AE',
  alpha3: 'ARE',
  numeric: 784,
  latitude: 24,
  longitude: 54,
},
{
  country: 'United Kingdom',
  alpha2: 'GB',
  alpha3: 'GBR',
  numeric: 826,
  latitude: 54,
  longitude: -2,
},
{
  country: 'United States of America',
  alpha2: 'US',
  alpha3: 'USA',
  numeric: 840,
  latitude: 38,
  longitude: -97,
},
{
  country: 'United States Minor Outlying Islands',
  alpha2: 'UM',
  alpha3: 'UMI',
  numeric: 581,
  latitude: 19.2833,
  longitude: 166.6,
},
{
  country: 'Uruguay',
  alpha2: 'UY',
  alpha3: 'URY',
  numeric: 858,
  latitude: -33,
  longitude: -56,
},
{
  country: 'Uzbekistan',
  alpha2: 'UZ',
  alpha3: 'UZB',
  numeric: 860,
  latitude: 41,
  longitude: 64,
},
{
  country: 'Vanuatu',
  alpha2: 'VU',
  alpha3: 'VUT',
  numeric: 548,
  latitude: -16,
  longitude: 167,
},
{
  country: 'Venezuela (Bolivarian Republic)',
  alpha2: 'VE',
  alpha3: 'VEN',
  numeric: 862,
  latitude: 8,
  longitude: -66,
},
{
  country: 'Viet Nam',
  alpha2: 'VN',
  alpha3: 'VNM',
  numeric: 704,
  latitude: 16,
  longitude: 106,
},
{
  country: 'Virgin Islands, British',
  alpha2: 'VG',
  alpha3: 'VGB',
  numeric: 92,
  latitude: 18.5,
  longitude: -64.5,
},
{
  country: 'Virgin Islands, U.S.',
  alpha2: 'VI',
  alpha3: 'VIR',
  numeric: 850,
  latitude: 18.3333,
  longitude: -64.8333,
},
{
  country: 'Wallis and Futuna',
  alpha2: 'WF',
  alpha3: 'WLF',
  numeric: 876,
  latitude: -13.3,
  longitude: -176.2,
},
{
  country: 'Western Sahara',
  alpha2: 'EH',
  alpha3: 'ESH',
  numeric: 732,
  latitude: 24.5,
  longitude: -13,
},
{
  country: 'Yemen',
  alpha2: 'YE',
  alpha3: 'YEM',
  numeric: 887,
  latitude: 15,
  longitude: 48,
},
{
  country: 'Zambia',
  alpha2: 'ZM',
  alpha3: 'ZMB',
  numeric: 894,
  latitude: -15,
  longitude: 30,
},
{
  country: 'Zimbabwe',
  alpha2: 'ZW',
  alpha3: 'ZWE',
  numeric: 716,
  latitude: -20,
  longitude: 30,
},
{
  country: 'Afghanistan',
  alpha2: 'AF',
  alpha3: 'AFG',
  numeric: 4,
  latitude: 33,
  longitude: 65,
},
];


/***/ }),

/***/ "./src/assets/js/dataCountry.js":
/*!**************************************!*\
  !*** ./src/assets/js/dataCountry.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dataCountry": () => /* binding */ dataCountry
/* harmony export */ });
const dataCountry = [
  {"flag":"https://restcountries.eu/data/afg.svg","name":"Afghanistan","population":27657145},
  {"flag":"https://restcountries.eu/data/ala.svg","name":"Åland Islands","population":28875},
  {"flag":"https://restcountries.eu/data/alb.svg","name":"Albania","population":2886026},
  {"flag":"https://restcountries.eu/data/dza.svg","name":"Algeria","population":40400000},
  {"flag":"https://restcountries.eu/data/asm.svg","name":"American Samoa","population":57100},
  {"flag":"https://restcountries.eu/data/and.svg","name":"Andorra","population":78014},
  {"flag":"https://restcountries.eu/data/ago.svg","name":"Angola","population":25868000},
  {"flag":"https://restcountries.eu/data/aia.svg","name":"Anguilla","population":13452},
  {"flag":"https://restcountries.eu/data/ata.svg","name":"Antarctica","population":1000},
  {"flag":"https://restcountries.eu/data/atg.svg","name":"Antigua and Barbuda","population":86295},
  {"flag":"https://restcountries.eu/data/arg.svg","name":"Argentina","population":43590400},
  {"flag":"https://restcountries.eu/data/arm.svg","name":"Armenia","population":2994400},
  {"flag":"https://restcountries.eu/data/abw.svg","name":"Aruba","population":107394},
  {"flag":"https://restcountries.eu/data/aus.svg","name":"Australia","population":24117360},
  {"flag":"https://restcountries.eu/data/aut.svg","name":"Austria","population":8725931},
  {"flag":"https://restcountries.eu/data/aze.svg","name":"Azerbaijan","population":9730500},
  {"flag":"https://restcountries.eu/data/bhs.svg","name":"Bahamas","population":378040},
  {"flag":"https://restcountries.eu/data/bhr.svg","name":"Bahrain","population":1404900},
  {"flag":"https://restcountries.eu/data/bgd.svg","name":"Bangladesh","population":161006790},
  {"flag":"https://restcountries.eu/data/brb.svg","name":"Barbados","population":285000},
  {"flag":"https://restcountries.eu/data/blr.svg","name":"Belarus","population":9498700},
  {"flag":"https://restcountries.eu/data/bel.svg","name":"Belgium","population":11319511},
  {"flag":"https://restcountries.eu/data/blz.svg","name":"Belize","population":370300},
  {"flag":"https://restcountries.eu/data/ben.svg","name":"Benin","population":10653654},
  {"flag":"https://restcountries.eu/data/bmu.svg","name":"Bermuda","population":61954},
  {"flag":"https://restcountries.eu/data/btn.svg","name":"Bhutan","population":775620},
  {"flag":"https://restcountries.eu/data/bol.svg","name":"Bolivia","population":10985059},
  {"flag":"https://restcountries.eu/data/bes.svg","name":"Bonaire, Sint Eustatius and Saba","population":17408},
  {"flag":"https://restcountries.eu/data/bih.svg","name":"Bosnia and Herzegovina","population":3531159},
  {"flag":"https://restcountries.eu/data/bwa.svg","name":"Botswana","population":2141206},
  {"flag":"https://restcountries.eu/data/bvt.svg","name":"Bouvet Island","population":0},
  {"flag":"https://restcountries.eu/data/bra.svg","name":"Brazil","population":206135893},
  {"flag":"https://restcountries.eu/data/iot.svg","name":"British Indian Ocean Territory","population":3000},
  {"flag":"https://restcountries.eu/data/umi.svg","name":"United States Minor Outlying Islands","population":300},
  {"flag":"https://restcountries.eu/data/vgb.svg","name":"Virgin Islands (British)","population":28514},
  {"flag":"https://restcountries.eu/data/vir.svg","name":"Virgin Islands (U.S.)","population":114743},
  {"flag":"https://restcountries.eu/data/brn.svg","name":"Brunei Darussalam","population":411900},
  {"flag":"https://restcountries.eu/data/bgr.svg","name":"Bulgaria","population":7153784},
  {"flag":"https://restcountries.eu/data/bfa.svg","name":"Burkina Faso","population":19034397},
  {"flag":"https://restcountries.eu/data/bdi.svg","name":"Burundi","population":10114505},
  {"flag":"https://restcountries.eu/data/khm.svg","name":"Cambodia","population":15626444},
  {"flag":"https://restcountries.eu/data/cmr.svg","name":"Cameroon","population":22709892},
  {"flag":"https://restcountries.eu/data/can.svg","name":"Canada","population":36155487},
  {"flag":"https://restcountries.eu/data/cpv.svg","name":"Cape Verde","population":531239},
  {"flag":"https://restcountries.eu/data/cym.svg","name":"Cayman Islands","population":58238},
  {"flag":"https://restcountries.eu/data/caf.svg","name":"Central African Republic","population":4998000},
  {"flag":"https://restcountries.eu/data/tcd.svg","name":"Chad","population":14497000},
  {"flag":"https://restcountries.eu/data/chl.svg","name":"Chile","population":18191900},
  {"flag":"https://restcountries.eu/data/chn.svg","name":"China","population":1377422166},
  {"flag":"https://restcountries.eu/data/cxr.svg","name":"Christmas Island","population":2072},
  {"flag":"https://restcountries.eu/data/cck.svg","name":"Cocos (Keeling) Islands","population":550},
  {"flag":"https://restcountries.eu/data/col.svg","name":"Colombia","population":48759958},
  {"flag":"https://restcountries.eu/data/com.svg","name":"Comoros","population":806153},
  {"flag":"https://restcountries.eu/data/cog.svg","name":"Congo (Brazzaville)","population":4741000},
  {"flag":"https://restcountries.eu/data/cod.svg","name":"Congo (Kinshasa)","population":85026000},
  {"flag":"https://restcountries.eu/data/cok.svg","name":"Cook Islands","population":18100},
  {"flag":"https://restcountries.eu/data/cri.svg","name":"Costa Rica","population":4890379},
  {"flag":"https://restcountries.eu/data/hrv.svg","name":"Croatia","population":4190669},
  {"flag":"https://restcountries.eu/data/cub.svg","name":"Cuba","population":11239004},
  {"flag":"https://restcountries.eu/data/cuw.svg","name":"Curaçao","population":154843},
  {"flag":"https://restcountries.eu/data/cyp.svg","name":"Cyprus","population":847000},
  {"flag":"https://restcountries.eu/data/cze.svg","name":"Czech Republic","population":10558524},
  {"flag":"https://restcountries.eu/data/dnk.svg","name":"Denmark","population":5717014},
  {"flag":"https://restcountries.eu/data/dji.svg","name":"Djibouti","population":900000},
  {"flag":"https://restcountries.eu/data/dma.svg","name":"Dominica","population":71293},
  {"flag":"https://restcountries.eu/data/dom.svg","name":"Dominican Republic","population":10075045},
  {"flag":"https://restcountries.eu/data/ecu.svg","name":"Ecuador","population":16545799},
  {"flag":"https://restcountries.eu/data/egy.svg","name":"Egypt","population":91290000},
  {"flag":"https://restcountries.eu/data/slv.svg","name":"El Salvador","population":6520675},
  {"flag":"https://restcountries.eu/data/gnq.svg","name":"Equatorial Guinea","population":1222442},
  {"flag":"https://restcountries.eu/data/eri.svg","name":"Eritrea","population":5352000},
  {"flag":"https://restcountries.eu/data/est.svg","name":"Estonia","population":1315944},
  {"flag":"https://restcountries.eu/data/eth.svg","name":"Ethiopia","population":92206005},
  {"flag":"https://restcountries.eu/data/flk.svg","name":"Falkland Islands (Malvinas)","population":2563},
  {"flag":"https://restcountries.eu/data/fro.svg","name":"Faroe Islands","population":49376},
  {"flag":"https://restcountries.eu/data/fji.svg","name":"Fiji","population":867000},
  {"flag":"https://restcountries.eu/data/fin.svg","name":"Finland","population":5491817},
  {"flag":"https://restcountries.eu/data/fra.svg","name":"France","population":66710000},
  {"flag":"https://restcountries.eu/data/guf.svg","name":"French Guiana","population":254541},
  {"flag":"https://restcountries.eu/data/pyf.svg","name":"French Polynesia","population":271800},
  {"flag":"https://restcountries.eu/data/atf.svg","name":"French Southern Territories","population":140},
  {"flag":"https://restcountries.eu/data/gab.svg","name":"Gabon","population":1802278},
  {"flag":"https://restcountries.eu/data/gmb.svg","name":"Gambia","population":1882450},
  {"flag":"https://restcountries.eu/data/geo.svg","name":"Georgia","population":3720400},
  {"flag":"https://restcountries.eu/data/deu.svg","name":"Germany","population":81770900},
  {"flag":"https://restcountries.eu/data/gha.svg","name":"Ghana","population":27670174},
  {"flag":"https://restcountries.eu/data/gib.svg","name":"Gibraltar","population":33140},
  {"flag":"https://restcountries.eu/data/grc.svg","name":"Greece","population":10858018},
  {"flag":"https://restcountries.eu/data/grl.svg","name":"Greenland","population":55847},
  {"flag":"https://restcountries.eu/data/grd.svg","name":"Grenada","population":103328},
  {"flag":"https://restcountries.eu/data/glp.svg","name":"Guadeloupe","population":400132},
  {"flag":"https://restcountries.eu/data/gum.svg","name":"Guam","population":184200},
  {"flag":"https://restcountries.eu/data/gtm.svg","name":"Guatemala","population":16176133},
  {"flag":"https://restcountries.eu/data/ggy.svg","name":"Guernsey","population":62999},
  {"flag":"https://restcountries.eu/data/gin.svg","name":"Guinea","population":12947000},
  {"flag":"https://restcountries.eu/data/gnb.svg","name":"Guinea-Bissau","population":1547777},
  {"flag":"https://restcountries.eu/data/guy.svg","name":"Guyana","population":746900},
  {"flag":"https://restcountries.eu/data/hti.svg","name":"Haiti","population":11078033},
  {"flag":"https://restcountries.eu/data/hmd.svg","name":"Heard Island and McDonald Islands","population":0},
  {"flag":"https://restcountries.eu/data/vat.svg","name":"Holy See (Vatican City State)","population":451},
  {"flag":"https://restcountries.eu/data/hnd.svg","name":"Honduras","population":8576532},
  {"flag":"https://restcountries.eu/data/hkg.svg","name":"Hong Kong","population":7324300},
  {"flag":"https://restcountries.eu/data/hun.svg","name":"Hungary","population":9823000},
  {"flag":"https://restcountries.eu/data/isl.svg","name":"Iceland","population":334300},
  {"flag":"https://restcountries.eu/data/ind.svg","name":"India","population":1295210000},
  {"flag":"https://restcountries.eu/data/idn.svg","name":"Indonesia","population":258705000},
  {"flag":"https://restcountries.eu/data/civ.svg","name":"Côte d'Ivoire","population":22671331},
  {"flag":"https://restcountries.eu/data/irn.svg","name":"Iran, Islamic Republic of","population":79369900},
  {"flag":"https://restcountries.eu/data/irq.svg","name":"Iraq","population":37883543},
  {"flag":"https://restcountries.eu/data/irl.svg","name":"Ireland","population":6378000},
  {"flag":"https://restcountries.eu/data/imn.svg","name":"Isle of Man","population":84497},
  {"flag":"https://restcountries.eu/data/isr.svg","name":"Israel","population":8527400},
  {"flag":"https://restcountries.eu/data/ita.svg","name":"Italy","population":60665551},
  {"flag":"https://restcountries.eu/data/jam.svg","name":"Jamaica","population":2723246},
  {"flag":"https://restcountries.eu/data/jpn.svg","name":"Japan","population":126960000},
  {"flag":"https://restcountries.eu/data/jey.svg","name":"Jersey","population":100800},
  {"flag":"https://restcountries.eu/data/jor.svg","name":"Jordan","population":9531712},
  {"flag":"https://restcountries.eu/data/kaz.svg","name":"Kazakhstan","population":17753200},
  {"flag":"https://restcountries.eu/data/ken.svg","name":"Kenya","population":47251000},
  {"flag":"https://restcountries.eu/data/kir.svg","name":"Kiribati","population":113400},
  {"flag":"https://restcountries.eu/data/kwt.svg","name":"Kuwait","population":4183658},
  {"flag":"https://restcountries.eu/data/kgz.svg","name":"Kyrgyzstan","population":6047800},
  {"flag":"https://restcountries.eu/data/lao.svg","name":"Lao PDR","population":6492400},
  {"flag":"https://restcountries.eu/data/lva.svg","name":"Latvia","population":1961600},
  {"flag":"https://restcountries.eu/data/lbn.svg","name":"Lebanon","population":5988000},
  {"flag":"https://restcountries.eu/data/lso.svg","name":"Lesotho","population":1894194},
  {"flag":"https://restcountries.eu/data/lbr.svg","name":"Liberia","population":4615000},
  {"flag":"https://restcountries.eu/data/lby.svg","name":"Libya","population":6385000},
  {"flag":"https://restcountries.eu/data/lie.svg","name":"Liechtenstein","population":37623},
  {"flag":"https://restcountries.eu/data/ltu.svg","name":"Lithuania","population":2872294},
  {"flag":"https://restcountries.eu/data/lux.svg","name":"Luxembourg","population":576200},
  {"flag":"https://restcountries.eu/data/mac.svg","name":"Macao, SAR China","population":649100},
  {"flag":"https://restcountries.eu/data/mkd.svg","name":"Macedonia, Republic of","population":2058539},
  {"flag":"https://restcountries.eu/data/mdg.svg","name":"Madagascar","population":22434363},
  {"flag":"https://restcountries.eu/data/mwi.svg","name":"Malawi","population":16832910},
  {"flag":"https://restcountries.eu/data/mys.svg","name":"Malaysia","population":31405416},
  {"flag":"https://restcountries.eu/data/mdv.svg","name":"Maldives","population":344023},
  {"flag":"https://restcountries.eu/data/mli.svg","name":"Mali","population":18135000},
  {"flag":"https://restcountries.eu/data/mlt.svg","name":"Malta","population":425384},
  {"flag":"https://restcountries.eu/data/mhl.svg","name":"Marshall Islands","population":54880},
  {"flag":"https://restcountries.eu/data/mtq.svg","name":"Martinique","population":378243},
  {"flag":"https://restcountries.eu/data/mrt.svg","name":"Mauritania","population":3718678},
  {"flag":"https://restcountries.eu/data/mus.svg","name":"Mauritius","population":1262879},
  {"flag":"https://restcountries.eu/data/myt.svg","name":"Mayotte","population":226915},
  {"flag":"https://restcountries.eu/data/mex.svg","name":"Mexico","population":122273473},
  {"flag":"https://restcountries.eu/data/fsm.svg","name":"Micronesia (Federated States of)","population":102800},
  {"flag":"https://restcountries.eu/data/mda.svg","name":"Moldova","population":3553100},
  {"flag":"https://restcountries.eu/data/mco.svg","name":"Monaco","population":38400},
  {"flag":"https://restcountries.eu/data/mng.svg","name":"Mongolia","population":3093100},
  {"flag":"https://restcountries.eu/data/mne.svg","name":"Montenegro","population":621810},
  {"flag":"https://restcountries.eu/data/msr.svg","name":"Montserrat","population":4922},
  {"flag":"https://restcountries.eu/data/mar.svg","name":"Morocco","population":33337529},
  {"flag":"https://restcountries.eu/data/moz.svg","name":"Mozambique","population":26423700},
  {"flag":"https://restcountries.eu/data/mmr.svg","name":"Myanmar","population":51419420},
  {"flag":"https://restcountries.eu/data/nam.svg","name":"Namibia","population":2324388},
  {"flag":"https://restcountries.eu/data/nru.svg","name":"Nauru","population":10084},
  {"flag":"https://restcountries.eu/data/npl.svg","name":"Nepal","population":28431500},
  {"flag":"https://restcountries.eu/data/nld.svg","name":"Netherlands","population":17019800},
  {"flag":"https://restcountries.eu/data/ncl.svg","name":"New Caledonia","population":268767},
  {"flag":"https://restcountries.eu/data/nzl.svg","name":"New Zealand","population":4697854},
  {"flag":"https://restcountries.eu/data/nic.svg","name":"Nicaragua","population":6262703},
  {"flag":"https://restcountries.eu/data/ner.svg","name":"Niger","population":20715000},
  {"flag":"https://restcountries.eu/data/nga.svg","name":"Nigeria","population":186988000},
  {"flag":"https://restcountries.eu/data/niu.svg","name":"Niue","population":1470},
  {"flag":"https://restcountries.eu/data/nfk.svg","name":"Norfolk Island","population":2302},
  {"flag":"https://restcountries.eu/data/prk.svg","name":"Korea (Democratic People's Republic of)","population":25281000},
  {"flag":"https://restcountries.eu/data/mnp.svg","name":"Northern Mariana Islands","population":56940},
  {"flag":"https://restcountries.eu/data/nor.svg","name":"Norway","population":5223256},
  {"flag":"https://restcountries.eu/data/omn.svg","name":"Oman","population":4420133},
  {"flag":"https://restcountries.eu/data/pak.svg","name":"Pakistan","population":194125062},
  {"flag":"https://restcountries.eu/data/plw.svg","name":"Palau","population":17950},
  {"flag":"https://restcountries.eu/data/pse.svg","name":"Palestinian Territory","population":4682467},
  {"flag":"https://restcountries.eu/data/pan.svg","name":"Panama","population":3814672},
  {"flag":"https://restcountries.eu/data/png.svg","name":"Papua New Guinea","population":8083700},
  {"flag":"https://restcountries.eu/data/pry.svg","name":"Paraguay","population":6854536},
  {"flag":"https://restcountries.eu/data/per.svg","name":"Peru","population":31488700},
  {"flag":"https://restcountries.eu/data/phl.svg","name":"Philippines","population":103279800},
  {"flag":"https://restcountries.eu/data/pcn.svg","name":"Pitcairn","population":56},
  {"flag":"https://restcountries.eu/data/pol.svg","name":"Poland","population":38437239},
  {"flag":"https://restcountries.eu/data/prt.svg","name":"Portugal","population":10374822},
  {"flag":"https://restcountries.eu/data/pri.svg","name":"Puerto Rico","population":3474182},
  {"flag":"https://restcountries.eu/data/qat.svg","name":"Qatar","population":2587564},
  {"flag":"https://restcountries.eu/data/kos.svg","name":"Republic of Kosovo","population":1733842},
  {"flag":"https://restcountries.eu/data/reu.svg","name":"Réunion","population":840974},
  {"flag":"https://restcountries.eu/data/rou.svg","name":"Romania","population":19861408},
  {"flag":"https://restcountries.eu/data/rus.svg","name":"Russian Federation","population":146599183},
  {"flag":"https://restcountries.eu/data/rwa.svg","name":"Rwanda","population":11553188},
  {"flag":"https://restcountries.eu/data/blm.svg","name":"Saint Barthélemy","population":9417},
  {"flag":"https://restcountries.eu/data/shn.svg","name":"Saint Helena, Ascension and Tristan da Cunha","population":4255},
  {"flag":"https://restcountries.eu/data/kna.svg","name":"Saint Kitts and Nevis","population":46204},
  {"flag":"https://restcountries.eu/data/lca.svg","name":"Saint Lucia","population":186000},
  {"flag":"https://restcountries.eu/data/maf.svg","name":"Saint Martin (French part)","population":36979},
  {"flag":"https://restcountries.eu/data/spm.svg","name":"Saint Pierre and Miquelon","population":6069},
  {"flag":"https://restcountries.eu/data/vct.svg","name":"Saint Vincent and Grenadines","population":109991},
  {"flag":"https://restcountries.eu/data/wsm.svg","name":"Samoa","population":194899},
  {"flag":"https://restcountries.eu/data/smr.svg","name":"San Marino","population":33005},
  {"flag":"https://restcountries.eu/data/stp.svg","name":"Sao Tome and Principe","population":187356},
  {"flag":"https://restcountries.eu/data/sau.svg","name":"Saudi Arabia","population":32248200},
  {"flag":"https://restcountries.eu/data/sen.svg","name":"Senegal","population":14799859},
  {"flag":"https://restcountries.eu/data/srb.svg","name":"Serbia","population":7076372},
  {"flag":"https://restcountries.eu/data/syc.svg","name":"Seychelles","population":91400},
  {"flag":"https://restcountries.eu/data/sle.svg","name":"Sierra Leone","population":7075641},
  {"flag":"https://restcountries.eu/data/sgp.svg","name":"Singapore","population":5535000},
  {"flag":"https://restcountries.eu/data/sxm.svg","name":"Sint Maarten (Dutch part)","population":38247},
  {"flag":"https://restcountries.eu/data/svk.svg","name":"Slovakia","population":5426252},
  {"flag":"https://restcountries.eu/data/svn.svg","name":"Slovenia","population":2064188},
  {"flag":"https://restcountries.eu/data/slb.svg","name":"Solomon Islands","population":642000},
  {"flag":"https://restcountries.eu/data/som.svg","name":"Somalia","population":11079000},
  {"flag":"https://restcountries.eu/data/zaf.svg","name":"South Africa","population":55653654},
  {"flag":"https://restcountries.eu/data/sgs.svg","name":"South Georgia and the South Sandwich Islands","population":30},
  {"flag":"https://restcountries.eu/data/kor.svg","name":"Korea (South)","population":50801405},
  {"flag":"https://restcountries.eu/data/ssd.svg","name":"South Sudan","population":12131000},
  {"flag":"https://restcountries.eu/data/esp.svg","name":"Spain","population":46438422},
  {"flag":"https://restcountries.eu/data/lka.svg","name":"Sri Lanka","population":20966000},
  {"flag":"https://restcountries.eu/data/sdn.svg","name":"Sudan","population":39598700},
  {"flag":"https://restcountries.eu/data/sur.svg","name":"Suriname","population":541638},
  {"flag":"https://restcountries.eu/data/sjm.svg","name":"Svalbard and Jan Mayen","population":2562},
  {"flag":"https://restcountries.eu/data/swz.svg","name":"Swaziland","population":1132657},
  {"flag":"https://restcountries.eu/data/swe.svg","name":"Sweden","population":9894888},
  {"flag":"https://restcountries.eu/data/che.svg","name":"Switzerland","population":8341600},
  {"flag":"https://restcountries.eu/data/syr.svg","name":"Syrian Arab Republic (Syria)","population":18564000},
  {"flag":"https://restcountries.eu/data/twn.svg","name":"Taiwan, Republic of China","population":23503349},
  {"flag":"https://restcountries.eu/data/tjk.svg","name":"Tajikistan","population":8593600},
  {"flag":"https://restcountries.eu/data/tza.svg","name":"Tanzania, United Republic of","population":55155000},
  {"flag":"https://restcountries.eu/data/tha.svg","name":"Thailand","population":65327652},
  {"flag":"https://restcountries.eu/data/tls.svg","name":"Timor-Leste","population":1167242},
  {"flag":"https://restcountries.eu/data/tgo.svg","name":"Togo","population":7143000},
  {"flag":"https://restcountries.eu/data/tkl.svg","name":"Tokelau","population":1411},
  {"flag":"https://restcountries.eu/data/ton.svg","name":"Tonga","population":103252},
  {"flag":"https://restcountries.eu/data/tto.svg","name":"Trinidad and Tobago","population":1349667},
  {"flag":"https://restcountries.eu/data/tun.svg","name":"Tunisia","population":11154400},
  {"flag":"https://restcountries.eu/data/tur.svg","name":"Turkey","population":78741053},
  {"flag":"https://restcountries.eu/data/tkm.svg","name":"Turkmenistan","population":4751120},
  {"flag":"https://restcountries.eu/data/tca.svg","name":"Turks and Caicos Islands","population":31458},
  {"flag":"https://restcountries.eu/data/tuv.svg","name":"Tuvalu","population":10640},
  {"flag":"https://restcountries.eu/data/uga.svg","name":"Uganda","population":33860700},
  {"flag":"https://restcountries.eu/data/ukr.svg","name":"Ukraine","population":42692393},
  {"flag":"https://restcountries.eu/data/are.svg","name":"United Arab Emirates","population":9856000},
  {"flag":"https://restcountries.eu/data/gbr.svg","name":"United Kingdom","population":65110000},
  {"flag":"https://restcountries.eu/data/usa.svg","name":"United States of America","population":323947000},
  {"flag":"https://restcountries.eu/data/ury.svg","name":"Uruguay","population":3480222},
  {"flag":"https://restcountries.eu/data/uzb.svg","name":"Uzbekistan","population":31576400},
  {"flag":"https://restcountries.eu/data/vut.svg","name":"Vanuatu","population":277500},
  {"flag":"https://restcountries.eu/data/ven.svg","name":"Venezuela (Bolivarian Republic)","population":31028700},
  {"flag":"https://restcountries.eu/data/vnm.svg","name":"Viet Nam","population":92700000},
  {"flag":"https://restcountries.eu/data/wlf.svg","name":"Wallis and Futuna","population":11750},
  {"flag":"https://restcountries.eu/data/esh.svg","name":"Western Sahara","population":510713},
  {"flag":"https://restcountries.eu/data/yem.svg","name":"Yemen","population":27478000},
  {"flag":"https://restcountries.eu/data/zmb.svg","name":"Zambia","population":15933883},
  {"flag":"https://restcountries.eu/data/zwe.svg","name":"Zimbabwe","population":14240168}
]


/***/ }),

/***/ "./src/assets/js/main.js":
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
/***/ (() => {

addEventListener('load', initEventsDOM);

function initEventsDOM() {
  //open and close the window to full width
  const listButtonOpen = document.querySelectorAll('.open');
  listButtonOpen.forEach((item) => {
    item.addEventListener('click', function(event) {
      //define an object button
      let target;
      if(event.target.tagName === 'BUTTON') {
        target = event.target;
      };
      if(event.target.tagName === 'I') {
        target = event.target.parentElement;
      };
      // const listHiddenModule = document.querySelectorAll('.wrap-data > div');
      const listHiddenModule = document.querySelectorAll('.wrap-data .widget');
      if(!target.classList.contains('close')) {
        //hidden elements
        listHiddenModule.forEach((item) => {
          item.classList.toggle('window-hidden');
        });
        //element active full width
        target.parentElement.classList.toggle('full-width');
        target.innerHTML = '<i class="material-icons">close</i>';
        target.classList.toggle('close');
      } else {
        //close the window that is full width
        target.classList.toggle('close');
        target.parentElement.classList.toggle('full-width');
        target.innerHTML = '<i class="material-icons">zoom_out_map</i>';
        listHiddenModule.forEach((item) => {
          item.classList.toggle('window-hidden');
        });
      }
    })
  });


}


/***/ }),

/***/ "./src/assets/js/map.js":
/*!******************************!*\
  !*** ./src/assets/js/map.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _country_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./country-codes */ "./src/assets/js/country-codes.js");


const mapBox = 'pk.eyJ1IjoiZmVkb3JvdmljaHBhdmVsIiwiYSI6ImNraW5lcTkzMzBtMW8ycm81cTd6N3N3aDIifQ.botvkeUgOwWBdkRdCIwuWg';

mapboxgl.accessToken = mapBox;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 0.5,
    center: [50, 20],
    scroll: false
});
//  MAP Fullscreen
// map.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector('#map') }));

const latlongMap = new Map();
_country_codes__WEBPACK_IMPORTED_MODULE_0__.country_codes.forEach((e) => latlongMap.set(e.country, [e.longitude, e.latitude]));

const getMarkColor = (x) => {
    if (x <= 100) { return '#f6dddd'; }
    if (x <= 1000) { return '#f4b5b5'; }
    if (x <= 10000) { return '#fa8080'; }
    if (x <= 100000) { return '#f84848'; }
    return '#ae0000';
};

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
};



fetch('https://api.covid19api.com/summary', requestOptions)
    .then((response) => response.json())
    .then((data) => {


        data.Countries.forEach((country) => {
            const { TotalConfirmed, Country } = country;
            const marker = document.createElement('div');
            marker.className = 'marker';
            marker.style.backgroundColor = getMarkColor(TotalConfirmed);
            new mapboxgl.Marker({
                    color: getMarkColor(TotalConfirmed),
                    element: marker
                })
                .setLngLat(latlongMap.get(Country))
                .setPopup(new mapboxgl.Popup({}).setHTML(`<strong>${Country}</strong>: confirmed ${TotalConfirmed}`))
                .addTo(map);


        });
        const marker1 = document.querySelectorAll('.marker');
        marker1.forEach((e, i) => e.addEventListener('click', () => {
            map.flyTo({
                center: latlongMap.get(data.Countries[i].Country),
                zoom: 4,
                essential: true
            });
        }));

        document.querySelector('#map').addEventListener('click', function(event) {
          console.log(event.target);
          console.log(document.querySelector('.mapboxgl-popup-content strong').textContent);
        })


    })
    .catch(() => new Error());


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_js_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/js/map */ "./src/assets/js/map.js");
/* harmony import */ var _assets_js_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/js/app */ "./src/assets/js/app.js");
/* harmony import */ var _assets_js_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/js/main */ "./src/assets/js/main.js");
/* harmony import */ var _assets_js_main__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_js_main__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _normalize_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./normalize.css */ "./src/normalize.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _assets_js_country_codes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/js/country-codes */ "./src/assets/js/country-codes.js");
/* harmony import */ var _assets_js_dataCountry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/js/dataCountry */ "./src/assets/js/dataCountry.js");










/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=script.js.map