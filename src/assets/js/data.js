import { addToDOM } from './app';
import { addMapOpt } from './map';
import { search } from './search';
let objDataGlobal;
let data;

addEventListener('load', init);

function init() {
    // //GLOBAL DATA
    objDataGlobal = {};

    //get data on page load
    // addEventListener('load', getData);
    getData();
    //get new data at 00:00 every day
    let updateData = setInterval(function() {
        const today = new Date();
        const hour = today.getHours();
        const min = today.getMinutes();
        const sec = today.getSeconds();
        if (hour === 0 && min === 0 && sec === 0) {
            getGlobalData();
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
        } else document.getElementById('minutes').innerText = min;
        //get data for API
        // getGlobalData();
    }

    getGlobalData();
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
        addToDOM(objDataGlobal);
        addMapOpt(data);
        search(data);
        //после получения данных в объект objDataGlobal вызываем функции, которые импортнули сюда, но описали в других файлах (см первую строчку и строчку 69) при описании функции указывайте праметр objDataGlobal
    }
}