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
