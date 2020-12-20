import { dataCountry } from './dataCountry';
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
  if(hour === 0 && min === 0 && sec === 0) {
    getGlobalData();
    // setGlobalDataToLocal();
  }
}, 1000);

//get date for last load data
function getData() {
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
  //get data for API
  getGlobalData();
}

async function getGlobalData() {
  const url = 'https://api.covid19api.com/summary';
  const res = await fetch(url);
  data = await res.json();
  //set data global
  objDataGlobal.totalConfirmed = data.Global.TotalConfirmed;
  objDataGlobal.totalRecovered = data.Global.TotalRecovered;
  objDataGlobal.totalDeaths = data.Global.TotalDeaths;
  //set data last day
  objDataGlobal.newConfirmed = data.Global.NewConfirmed;
  objDataGlobal.newRecovered = data.Global.NewRecovered;
  objDataGlobal.newDeaths = data.Global.NewDeaths;
  //set data by country
  objDataGlobal.countries = data.Countries;
  //add data to DOM
  addToDOM();
}

function addToDOM() {
  console.log(objDataGlobal.countries);
  function getGlobalDatatoDom() {
    // default data
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
  }
  getGlobalDatatoDom();
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
    const home = document.querySelector('.button-global');
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
    home.addEventListener('click', function() {
      getGlobalDatatoDom();
      const startIndex = 0;
      addContentGlobalDate(startIndex);
      if(document.querySelector('.backlight')) {
        document.querySelector('.backlight').classList.remove('backlight');
      }
      document.querySelector('[name="country"]').value = '';
    })
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
  };

  //start list countries
  let arrWork = objDataGlobal.countries;
  let startSort = 0;
  arrWork = objDataGlobal.countries;
  arrWork.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
  addNewListCountries(startSort, arrWork);

  function addNewListCountries(sort, arrWork) {
    let listCountries = document.querySelectorAll('.countries .item-country');

    listCountries.forEach((item, i) => {
      // //sort
      // let arrWork = objDataGlobal.countries;
      // arrWork.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      //add name country
      item.textContent = arrWork[i].Country;
      //add flag
      let cMarker = arrWork[i].Country;
      const flag = dataCountry.filter((item) => item.name === cMarker)[0].flag;
      let itemFlag = document.createElement('span');
      itemFlag.classList.add('flag-country');
      item.prepend(itemFlag);
      itemFlag.style.background = `url(${flag}) no-repeat left center`;
      itemFlag.style.backgroundSize = 'cover';
      //add data by sort
      const countForItem = document.createElement('span');
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
      }
      //countForItem.textContent = ' - ' + arrWork[i].TotalConfirmed.toLocaleString();
    });
  }

  //get data by country for click
  let selected;
  parentCountries.addEventListener('click', function(event) {
    let target = event.target;
    while(target !== parentCountries) {
      if(target.tagName === 'LI') {
          const i = target.getAttribute('data-id');

          viewDataForCountry(i);

          backlight(target);

          function backlight(item) {
            if(selected) {
              selected.classList.remove('backlight');
            }
            selected = item;
            selected.classList.add('backlight');
          }

          return;
      };
      target = target.parentElement;
    }
  })

  function viewDataForCountry(i) {
    let item = objDataGlobal.countries[i];

    //get data by country (population)
    let markerName = objDataGlobal.countries[i].Country;
    const checkedCountry = dataCountry.filter((item) => item.name === markerName)[0].population;
    //get new numbers by checked country
    const countPeopleAll = checkedCountry;
    const countPeople = countPeopleAll / 100000;

    //data global per 100 thousand population
    const totalConfirmedForPeople = Math.round(item.TotalConfirmed / countPeople);
    const totalRecoveredForPeople = Math.round(item.TotalRecovered / countPeople);
    const totalDeathsForPeople = Math.round(item.TotalDeaths / countPeople);

    //data last day per 100 thousand population
    const newConfirmedForPeople = Math.round(objDataGlobal.newConfirmed / countPeople);
    const newRecoveredForPeople = Math.round(objDataGlobal.newRecovered / countPeople);
    const newDeathsForPeople = Math.round(objDataGlobal.newDeaths / countPeople);

    arrData = [
      [item.TotalConfirmed, item.TotalRecovered, item.TotalDeaths, `Data for the ${markerName}`, '(absolute values)'],
      [item.NewConfirmed, item.NewRecovered, item.NewDeaths, `Data for the last day (${markerName})`, '(absolute values)'],
      [totalConfirmedForPeople, totalRecoveredForPeople , totalDeathsForPeople, `Data for the ${markerName}`, '(per 100 thousand population)'],
      [newConfirmedForPeople, newRecoveredForPeople, newDeathsForPeople, `Data for the last day (${markerName})`, '(per 100 thousand population)']
    ];

    const startIndex = 0;
    addContentGlobalDate(startIndex);

    document.querySelector('[name="country"]').value = markerName;
    //select other global data
    selectData();
  }

  //select other data to list countries
  selectDataCountries();
  function selectDataCountries() {
    let index = 0;
    const next = document.querySelector('.next-data');
    const prev = document.querySelector('.prev-data');

    next.addEventListener('click', function() {
      if(index === 5) {
        index = 0;
      } else {
        index ++;
      }
      sortDate(index);
    });
    prev.addEventListener('click', function() {
      if(index === 0) {
        index = 5;
      } else {
        index --;
      }
      sortDate(index);
    });
  }

  //sort data by countries
  function sortDate(i) {
    let text = document.querySelector('.title-toggle');
    let arrWork;
    switch (i) {
      case 0:
        arrWork = objDataGlobal.countries;
        arrWork.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
        text.textContent = 'global by country confirmed';
        break;
      case 1:
        arrWork = objDataGlobal.countries;
        arrWork.sort((a, b) => b.TotalRecovered - a.TotalRecovered);
        text.textContent = 'global by country recovered';
        break;
      case 2:
        arrWork = objDataGlobal.countries;
        arrWork.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
        text.textContent = 'global by country deaths';
        break;
      case 3:
        arrWork = objDataGlobal.countries;
        arrWork.sort((a, b) => b.NewConfirmed - a.NewConfirmed);
        text.textContent = 'last day by country confirmed';
        break;
      case 4:
        arrWork = objDataGlobal.countries;
        arrWork.sort((a, b) => b.NewRecovered - a.NewRecovered);
        text.textContent = 'last day by country recovered';
        break;
      case 5:
        arrWork = objDataGlobal.countries;
        arrWork.sort((a, b) => b.NewDeaths - a.NewDeaths);
        text.textContent = 'last day by country deaths';
        break;
      default:
        break;
    };
    addNewListCountries(i, arrWork);
  }
}
