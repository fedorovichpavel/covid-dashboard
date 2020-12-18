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
/***/ (() => {

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

/***/ "./src/assets/js/countries.js":
/*!************************************!*\
  !*** ./src/assets/js/countries.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "country_list": () => /* binding */ country_list
/* harmony export */ });

let country_list = [
	{ name: 'USA', code: 'US' },
	{ name: 'Spain', code: 'ES' },
	{ name: 'Italy', code: 'IT' },
	{ name: 'France', code: 'FR' },
	{ name: 'Germany', code: 'DE' },
	{ name: 'UK', code: 'GB' },
	{ name: 'Turkey', code: 'TR' },
	{ name: 'Iran', code: 'IR' },
	{ name: 'Russia', code: 'RU' },
	{ name: 'Belgium', code: 'BE' },
	{ name: 'Brazil', code: 'BR' },
	{ name: 'Canada', code: 'CA' },
	{ name: 'Netherlands', code: 'NL' },
	{ name: 'Switzerland', code: 'CH' },
	{ name: 'Portugal', code: 'PT' },
	{ name: 'India', code: 'IN' },
	{ name: 'Ireland', code: 'IE' },
	{ name: 'Austria', code: 'AT' },
	{ name: 'Peru', code: 'PE' },
	{ name: 'Sweden', code: 'SE' },
	{ name: 'Japan', code: 'JP' },
	{ name: 'S. Korea', code: 'KR' },
	{ name: 'Chile', code: 'CL' },
	{ name: 'Saudi Arabia', code: 'SA' },
	{ name: 'Poland', code: 'PL' },
	{ name: 'Ecuador', code: 'EC' },
	{ name: 'Romania', code: 'RO' },
	{ name: 'Pakistan', code: 'PK' },
	{ name: 'Mexico', code: 'MX' },
	{ name: 'Denmark', code: 'DK' },
	{ name: 'Norway', code: 'NO' },
	{ name: 'UAE', code: 'AE' },
	{ name: 'Czechia', code: 'CZ' },
	{ name: 'Australia', code: 'AU' },
	{ name: 'Singapore', code: 'SG' },
	{ name: 'Indonesia', code: 'ID' },
	{ name: 'Serbia', code: 'RS' },
	{ name: 'Philippines', code: 'PH' },
	{ name: 'Ukraine', code: 'UA' },
	{ name: 'Qatar', code: 'QA' },
	{ name: 'Malaysia', code: 'MY' },
	{ name: 'Belarus', code: 'BY' },
	{ name: 'Dominican Republic', code: 'DO' },
	{ name: 'Panama', code: 'PA' },
	{ name: 'Finland', code: 'FI' },
	{ name: 'Colombia', code: 'CO' },
	{ name: 'Luxembourg', code: 'LU' },
	{ name: 'South Africa', code: 'ZA' },
	{ name: 'Egypt', code: 'EG' },
	{ name: 'Argentina', code: 'AR' },
	{ name: 'Morocco', code: 'MA' },
	{ name: 'Thailand', code: 'TH' },
	{ name: 'Algeria', code: 'DZ' },
	{ name: 'Moldova', code: 'MD' },
	{ name: 'Bangladesh', code: 'BD' },
	{ name: 'Greece', code: 'GR' },
	{ name: 'Hungary', code: 'HU' },
	{ name: 'Kuwait', code: 'KW' },
	{ name: 'Bahrain', code: 'BH' },
	{ name: 'Croatia', code: 'HR' },
	{ name: 'Iceland', code: 'IS' },
	{ name: 'Kazakhstan', code: 'KZ' },
	{ name: 'Uzbekistan', code: 'UZ' },
	{ name: 'Estonia', code: 'EE' },
	{ name: 'Iraq', code: 'IQ' },
	{ name: 'New Zealand', code: 'NZ' },
	{ name: 'Azerbaijan', code: 'AZ' },
	{ name: 'Slovenia', code: 'SI' },
	{ name: 'Lithuania', code: 'LT' },
	{ name: 'Armenia', code: 'AM' },
	{ name: 'Bosnia and Herzegovina', code: 'BA' },
	{ name: 'Oman', code: 'OM' },
	{ name: 'North Macedonia', code: 'MK' },
	{ name: 'Slovakia', code: 'SK' },
	{ name: 'Cuba', code: 'CU' },
	{ name: 'Hong Kong', code: 'HK' },
	{ name: 'Cameroon', code: 'CM' },
	{ name: 'Afghanistan', code: 'AF' },
	{ name: 'Bulgaria', code: 'BG' },
	{ name: 'Tunisia', code: 'TN' },
	{ name: 'Ghana', code: 'GH' },
	{ name: 'Ivory Coast', code: 'CI' },
	{ name: 'Cyprus', code: 'CY' },
	{ name: 'Djibouti', code: 'DJ' },
	{ name: 'Latvia', code: 'LV' },
	{ name: 'Andorra', code: 'AD' },
	{ name: 'Lebanon', code: 'LB' },
	{ name: 'Costa Rica', code: 'CR' },
	{ name: 'Niger', code: 'NE' },
	{ name: 'Burkina Faso', code: 'BF' },
	{ name: 'Albania', code: 'AL' },
	{ name: 'Kyrgyzstan', code: 'KG' },
	{ name: 'Nigeria', code: 'NG' },
	{ name: 'Bolivia', code: 'BO' },
	{ name: 'Guinea', code: 'GN' },
	{ name: 'Uruguay', code: 'UY' },
	{ name: 'Honduras', code: 'HN' },
	{ name: 'San Marino', code: 'SM' },
	{ name: 'Palestine', code: 'PS' },
	{ name: 'Malta', code: 'MT' },
	{ name: 'Taiwan', code: 'TW' },
	{ name: 'Jordan', code: 'JO' },
	{ name: 'Réunion', code: 'RE' },
	{ name: 'Georgia', code: 'GE' },
	{ name: 'Senegal', code: 'SN' },
	{ name: 'Mauritius', code: 'MU' },
	{ name: 'DRC', code: 'CD' },
	{ name: 'Montenegro', code: 'ME' },
	{ name: 'Isle of Man', code: 'IM' },
	{ name: 'Sri Lanka', code: 'LK' },
	{ name: 'Mayotte', code: 'YT' },
	{ name: 'Kenya', code: 'KE' },
	{ name: 'Vietnam', code: 'VN' },
	{ name: 'Guatemala', code: 'GT' },
	{ name: 'Venezuela', code: 'VE' },
	{ name: 'Mali', code: 'ML' },
	{ name: 'Paraguay', code: 'PY' },
	{ name: 'El Salvador', code: 'SV' },
	{ name: 'Jamaica', code: 'JM' },
	{ name: 'Tanzania', code: 'TZ' },
	{ name: 'Martinique', code: 'MQ' },
	{ name: 'Guadeloupe', code: 'GP' },
	{ name: 'Rwanda', code: 'RW' },
	{ name: 'Congo', code: 'CG' },
	{ name: 'Brunei', code: 'BN' },
	{ name: 'Somalia', code: 'SO' },
	{ name: 'Gibraltar', code: 'GI' },
	{ name: 'Cambodia', code: 'KH' },
	{ name: 'Madagascar', code: 'MG' },
	{ name: 'Trinidad and Tobago', code: 'TT' },
	{ name: 'Gabon', code: 'GA' },
	{ name: 'Myanmar', code: 'MM' },
	{ name: 'Ethiopia', code: 'ET' },
	{ name: 'Aruba', code: 'AW' },
	{ name: 'French Guiana', code: 'GF' },
	{ name: 'Monaco', code: 'MC' },
	{ name: 'Bermuda', code: 'BM' },
	{ name: 'Togo', code: 'TG' },
	{ name: 'Liechtenstein', code: 'LI' },
	{ name: 'Equatorial Guinea', code: 'GQ' },
	{ name: 'Liberia', code: 'LR' },
	{ name: 'Barbados', code: 'BB' },
	{ name: 'Sudan', code: 'SD' },
	{ name: 'Guyana', code: 'GY' },
	{ name: 'Zambia', code: 'ZM' },
	{ name: 'Cabo Verde', code: 'CV' },
	{ name: 'Cayman Islands', code: 'KY' },
	{ name: 'Bahamas', code: 'BS' },
	{ name: 'French Polynesia', code: 'PF' },
	{ name: 'Uganda', code: 'UG' },
	{ name: 'Maldives', code: 'MV' },
	{ name: 'Libya', code: 'LY' },
	{ name: 'Guinea-Bissau', code: 'GW' },
	{ name: 'Macao', code: 'MO' },
	{ name: 'Haiti', code: 'HT' },
	{ name: 'Syria', code: 'SY' },
	{ name: 'Eritrea', code: 'ER' },
	{ name: 'Mozambique', code: 'MZ' },
	{ name: 'Saint Martin', code: 'MF' },
	{ name: 'Benin', code: 'BJ' },
	{ name: 'Chad', code: 'TD' },
	{ name: 'Mongolia', code: 'MN' },
	{ name: 'Nepal', code: 'NP' },
	{ name: 'Sierra Leone', code: 'SL' },
	{ name: 'Zimbabwe', code: 'ZW' },
	{ name: 'Angola', code: 'AO' },
	{ name: 'Antigua and Barbuda', code: 'AG' },
	{ name: 'Eswatini', code: 'SZ' },
	{ name: 'Botswana', code: 'BW' },
	{ name: 'Timor-Leste', code: 'TL' },
	{ name: 'Belize', code: 'BZ' },
	{ name: 'New Caledonia', code: 'NC' },
	{ name: 'Malawi', code: 'MW' },
	{ name: 'Fiji', code: 'FJ' },
	{ name: 'Dominica', code: 'DM' },
	{ name: 'Namibia', code: 'NA' },
	{ name: 'Saint Lucia', code: 'LC' },
	{ name: 'Grenada', code: 'GD' },
	{ name: 'Saint Kitts and Nevis', code: 'KN' },
	{ name: 'CAR', code: 'CF' },
	{ name: 'St. Vincent Grenadines', code: 'VC' },
	{ name: 'Turks and Caicos', code: 'TC' },
	{ name: 'Falkland Islands', code: 'FK' },
	{ name: 'Greenland', code: 'GL' },
	{ name: 'Montserrat', code: 'MS' },
	{ name: 'Seychelles', code: 'SC' },
	{ name: 'Suriname', code: 'SR' },
	{ name: 'Nicaragua', code: 'NI' },
	{ name: 'Gambia', code: 'GM' },
	{ name: 'Vatican City', code: 'VA' },
	{ name: 'Mauritania', code: 'MR' },
	{ name: 'Papua New Guinea', code: 'PG' },
	{ name: 'St. Barth', code: 'BL' },
	{ name: 'Burundi', code: 'BI' },
	{ name: 'Bhutan', code: 'BT' },
	{ name: 'Caribbean Netherlands', code: 'BQ' },
	{ name: 'British Virgin Islands', code: 'VG' },
	{ name: 'Sao Tome and Principe', code: 'ST' },
	{ name: 'South Sudan', code: 'SD' },
	{ name: 'Anguilla', code: 'AI' },
	{ name: 'Saint Pierre Miquelon', code: 'PM' },
	{ name: 'Yemen', code: 'YE' },
	{ name: 'China', code: 'CN' }
];

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
      const listHiddenModule = document.querySelectorAll('.wrap-data > div');
      if(!target.classList.contains('close')) {
        //hidden elements
        listHiddenModule.forEach((item) => {
          item.classList.toggle('window-hidden');
        });
        //element active full width
        target.parentElement.parentElement.classList.toggle('full-width');
        target.innerHTML = '<i class="material-icons">close</i>';
        target.classList.toggle('close');
      } else {
        //close the window that is full width
        target.classList.toggle('close');
        target.parentElement.parentElement.classList.toggle('full-width');
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
//map.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector('map') }));

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

    })
    .catch(() => new Error());

/***/ }),

/***/ "./src/assets/js/script.js":
/*!*********************************!*\
  !*** ./src/assets/js/script.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _countries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./countries */ "./src/assets/js/countries.js");


const searchCountry = document.querySelector('.pick__country')
const nameOfCountry = document.querySelector('.name')
const countryList = document.querySelector('.country-list')
const hideList = document.querySelector('.close')
const input = document.getElementById('search__country')


function showAllCountries() {
	const numberOfCountries = _countries__WEBPACK_IMPORTED_MODULE_0__.country_list.length;

	let i = 0,
		changeUlListId;

	_countries__WEBPACK_IMPORTED_MODULE_0__.country_list.forEach((country, index) => {
		if (index % Math.ceil(numberOfCountries / listsNumber) == 0) {
			changeUlListId = `list-${i}`;
			countryList.innerHTML += `<ul id='${changeUlListId}'></ul>`;
			i++;
		}
		document.getElementById(`${changeUlListId}`).innerHTML += `
		<li onclick='fetchDataCountries("${country.name}")' id="${country.name}">
		${country.name}
		</li>

		`
	})
};
let listsNumber = 3;
showAllCountries();

hideList.addEventListener('click', () => {
	searchCountry.classList.add('hide');
});
nameOfCountry.addEventListener('click', () => {
	input.value = '';
	resetCountryList();
	searchCountry.classList.toggle('hide');
	searchCountry.classList.add('fadeIn');
	input.focus();
});
countryList.addEventListener('click', () => {
	searchCountry.classList.toggle('hide');
});

input.addEventListener('input', () => {
	let value = input.value.toUpperCase();

	_countries__WEBPACK_IMPORTED_MODULE_0__.country_list.forEach(country => {
		if (country.name.toUpperCase().startsWith(value)) {
			document.getElementById(country.name).classList.remove('hide');
		} else {
			document.getElementById(country.name).classList.add('hide');
		}
	})
})

const resetCountryList = () => {
	_countries__WEBPACK_IMPORTED_MODULE_0__.country_list.forEach(country => {
		document.getElementById(country.name).classList.remove('hide');
	})
}

// Work with api
const nameOFCountry = document.querySelector(".country .name");
const totalCasesValue = document.querySelector(".total__cases .value");
const newCasesValue = document.querySelector(".total__cases .new-value");
const recoveredValue = document.querySelector(".recovered .value");
const newRecoveredValue = document.querySelector(".recovered .new-value");
const deathsValue = document.querySelector(".deaths .value");
const newDeathsValue = document.querySelector(".deaths .new-value");

const ctx = document.getElementById("chart").getContext("2d");

let globalDataArr = [],
	casesArr = [],
	recoveredArr = [],
	deathsArr = [],
	deaths = [],
	dates = [],
	datesArr = [];

let codeOfCountry = geoplugin_countryCode(),
	yourCountry;
_countries__WEBPACK_IMPORTED_MODULE_0__.country_list.forEach(country => {
	if (country.code === codeOfCountry) {
		yourCountry = country.name;
	}
})


function fetchDataCountries(country) {
	yourCountry = country;
	nameOFCountry.innerHTML = "Loading...";

	(casesArr = []),
		(recoveredArr = []),
		(deathsArr = []),
		(dates = []),
		(datesArr = []);

	let requestVariation = {
		method: "GET",
		redirect: "follow",
	};

	const fetchApi = async (country) => {
		await fetch(
			`https://api.covid19api.com/total/country/${country}/status/confirmed`,
			requestVariation
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				data.forEach((item) => {
					dates.push(item.Date);
					casesArr.push(item.Cases);
				});
			});

		await fetch(
			`https://api.covid19api.com/total/country/${country}/status/recovered`,
			requestVariation
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {

				data.forEach((item) => {
					recoveredArr.push(item.Cases);
				});
			});

		await fetch(
			`https://api.covid19api.com/total/country/${country}/status/deaths`,
			requestVariation
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				data.forEach((item) => {
					deathsArr.push(item.Cases);
				});
			});

		updateStatChart();
	};

	fetchApi(country);
}

fetchDataCountries(yourCountry);

// Update Statistics and Chart
function updateStatChart() {
	updateStatistics();
	chartIt();
}

function updateStatistics() {
	const totalCases = casesArr[casesArr.length - 1];

	const newCases = totalCases - casesArr[casesArr.length - 2];

	const totalRecovered = recoveredArr[recoveredArr.length - 1];
	const newRecoveredCases =
		totalRecovered - recoveredArr[recoveredArr.length - 2];

	const totalDeaths = deathsArr[deathsArr.length - 1];
	const newDeathsCases = totalDeaths - deathsArr[deathsArr.length - 2];

	nameOFCountry.innerHTML = yourCountry;
	totalCasesValue.innerHTML = totalCases;
	newCasesValue.innerHTML = `+${newCases}`;
	recoveredValue.innerHTML = totalRecovered;
	newRecoveredValue.innerHTML = `+${newRecoveredCases}`;
	deathsValue.innerHTML = totalDeaths;
	newDeathsValue.innerHTML = `+${newDeathsCases}`;

	// format dates
	dates.forEach((date) => {
		datesArr.push(formatDate(date));
	});
}

// UPDATE CHART
let chart;

function chartIt() {
	if (chart) {
		chart.destroy();
	}

	chart = new Chart(ctx, {
		type: "bar",
		data: {
			datasets: [{
				label: "Cases",
				data: casesArr,
				fill: false,
				borderColor: "hsl(288, 97%, 71%)",
				backgroundColor: "hsl(288, 97%, 71%)",
				borderWidth: 1,
			},
			{
				label: "Recovered",
				data: recoveredArr,
				fill: false,
				borderColor: "hsl(106, 96%, 35%)",
				backgroundColor: "hsl(106, 96%, 35%)",
				borderWidth: 1,
			},
			{
				label: "Deaths",
				data: deathsArr,
				fill: false,
				borderColor: "#8B0000",
				backgroundColor: "#8B0000",
				borderWidth: 1,
			},
			],
			labels: datesArr,
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
		},
	});
}

// FORMAT DATES
const allMonths = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
	"Jan"
];

function formatDate(dateString) {
	let date = new Date(dateString);
	let month = date.getMonth();
	console.log(date.getMonth());
	return `${date.getDate()} ${allMonths[month]}`;
}

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
/* harmony import */ var _assets_js_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_js_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_js_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/js/main */ "./src/assets/js/main.js");
/* harmony import */ var _assets_js_main__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_js_main__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _normalize_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./normalize.css */ "./src/normalize.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _assets_js_country_codes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/js/country-codes */ "./src/assets/js/country-codes.js");
/* harmony import */ var _assets_js_countries__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/js/countries */ "./src/assets/js/countries.js");
/* harmony import */ var _assets_js_script__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/js/script */ "./src/assets/js/script.js");










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