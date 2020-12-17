"use strict";

var searchCountry = document.querySelector('.pick__country');
var nameOfCountry = document.querySelector('.name');
var countryList = document.querySelector('.country-list');
var hideList = document.querySelector('.close');
var input = document.getElementById('search__country');

function showAllCountries() {
  var numberOfCountries = country_list.length;
  var i = 0,
      changeUlListId;
  country_list.forEach(function (country, index) {
    if (index % Math.ceil(numberOfCountries / listsNumber) == 0) {
      changeUlListId = "list-".concat(i);
      countryList.innerHTML += "<ul id='".concat(changeUlListId, "'></ul>");
      i++;
    }

    document.getElementById("".concat(changeUlListId)).innerHTML += "\n\t\t<li onclick='fetchDataCountries(\"".concat(country.name, "\")' id=\"").concat(country.name, "\">\n\t\t").concat(country.name, "\n\t\t</li>\n\n\t\t");
  });
}

;
var listsNumber = 3;
showAllCountries();
hideList.addEventListener('click', function () {
  searchCountry.classList.add('hide');
});
nameOfCountry.addEventListener('click', function () {
  input.value = '';
  resetCountryList();
  searchCountry.classList.toggle('hide');
  searchCountry.classList.add('fadeIn');
  input.focus();
});
countryList.addEventListener('click', function () {
  searchCountry.classList.toggle('hide');
});
input.addEventListener('input', function () {
  var value = input.value.toUpperCase();
  country_list.forEach(function (country) {
    if (country.name.toUpperCase().startsWith(value)) {
      document.getElementById(country.name).classList.remove('hide');
    } else {
      document.getElementById(country.name).classList.add('hide');
    }
  });
});

var resetCountryList = function resetCountryList() {
  country_list.forEach(function (country) {
    document.getElementById(country.name).classList.remove('hide');
  });
}; // Work with api


var nameOFCountry = document.querySelector(".country .name");
var totalCasesValue = document.querySelector(".total__cases .value");
var newCasesValue = document.querySelector(".total__cases .new-value");
var recoveredValue = document.querySelector(".recovered .value");
var newRecoveredValue = document.querySelector(".recovered .new-value");
var deathsValue = document.querySelector(".deaths .value");
var newDeathsValue = document.querySelector(".deaths .new-value");
var ctx = document.getElementById("chart").getContext("2d");
var globalDataArr = [],
    casesArr = [],
    recoveredArr = [],
    deathsArr = [],
    deaths = [],
    datesArr = [];
var codeOfCountry = geoplugin_countryCode(),
    yourCountry;
country_list.forEach(function (country) {
  if (country.code === codeOfCountry) {
    yourCountry = country.name;
  }
});

function fetchDataCountries(country) {
  yourCountry = country;
  nameOFCountry.innerHTML = "Loading...";
  casesArr = [], recoveredArr = [], deathsArr = [], dates = [], datesArr = [];
  var requestVariation = {
    method: "GET",
    redirect: "follow"
  };

  var fetchApi = function fetchApi(country) {
    return regeneratorRuntime.async(function fetchApi$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(fetch("https://api.covid19api.com/total/country/".concat(country, "/status/confirmed"), requestVariation).then(function (res) {
              return res.json();
            }).then(function (data) {
              data.forEach(function (item) {
                dates.push(item.Date);
                casesArr.push(item.Cases);
              });
            }));

          case 2:
            _context.next = 4;
            return regeneratorRuntime.awrap(fetch("https://api.covid19api.com/total/country/".concat(country, "/status/recovered"), requestVariation).then(function (res) {
              return res.json();
            }).then(function (data) {
              data.forEach(function (item) {
                recoveredArr.push(item.Cases);
              });
            }));

          case 4:
            _context.next = 6;
            return regeneratorRuntime.awrap(fetch("https://api.covid19api.com/total/country/".concat(country, "/status/deaths"), requestVariation).then(function (res) {
              return res.json();
            }).then(function (data) {
              data.forEach(function (item) {
                deathsArr.push(item.Cases);
              });
            }));

          case 6:
            updateStatChart();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  fetchApi(country);
}

fetchDataCountries(yourCountry); // Update Statistics and Chart

function updateStatChart() {
  updateStatistics();
  chartIt();
}

function updateStatistics() {
  var totalCases = casesArr[casesArr.length - 1];
  var newCases = totalCases - casesArr[casesArr.length - 2];
  var totalRecovered = recoveredArr[recoveredArr.length - 1];
  var newRecoveredCases = totalRecovered - recoveredArr[recoveredArr.length - 2];
  var totalDeaths = deathsArr[deathsArr.length - 1];
  var newDeathsCases = totalDeaths - deathsArr[deathsArr.length - 2];
  nameOFCountry.innerHTML = yourCountry;
  totalCasesValue.innerHTML = totalCases;
  newCasesValue.innerHTML = "+".concat(newCases);
  recoveredValue.innerHTML = totalRecovered;
  newRecoveredValue.innerHTML = "+".concat(newRecoveredCases);
  deathsValue.innerHTML = totalDeaths;
  newDeathsValue.innerHTML = "+".concat(newDeathsCases); // format dates

  dates.forEach(function (date) {
    datesArr.push(formatDate(date));
  });
} // UPDATE CHART


var chart;

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
        borderWidth: 1
      }, {
        label: "Recovered",
        data: recoveredArr,
        fill: false,
        borderColor: "hsl(106, 96%, 35%)",
        backgroundColor: "hsl(106, 96%, 35%)",
        borderWidth: 1
      }, {
        label: "Deaths",
        data: deathsArr,
        fill: false,
        borderColor: "#8B0000",
        backgroundColor: "#8B0000",
        borderWidth: 1
      }],
      labels: datesArr
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
} // FORMAT DATES


var allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(dateString) {
  var date = new Date(dateString);
  return "".concat(date.getDate(), " ").concat(allMonths[date.getMonth() - 1]);
}