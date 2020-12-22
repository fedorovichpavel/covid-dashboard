import { dataCountry } from './dataCountry';
import { mapFly } from './map';
import { mapFlyToCenter } from './map';
import { fetchDataCountries } from './script';

// let arrData;

export function addToDOM(objDataGlobal) {
    let arrWork = objDataGlobal.countries;
    objDataGlobal.countries.forEach((item, i) => {
        //add people
        let marker = arrWork[i].Country;
        let people = dataCountry.filter((item) => item.name === marker)[0].population;
        item.People = people;
        //add data by country per 100 thousand population
        let number = item.People / 100000;
        item.TCPeople = Math.round(item.TotalConfirmed / number);
        item.TRPeople = Math.round(item.TotalRecovered / number);
        item.TDPeople = Math.round(item.TotalDeaths / number);
        item.lastDayTCPeople = Math.round(item.NewConfirmed / number);
        item.lastDayTRPeople = Math.round(item.NewRecovered / number);
        item.lastdayTDPeople = Math.round(item.NewDeaths / number);
    });

    let arrData;

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
            [totalConfirmedForPeople, totalRecoveredForPeople, totalDeathsForPeople, 'Global for the world', '(per 100 thousand population)'],
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
            if (index === 3) {
                index = 0;
            } else {
                index++;
            }
            addContentGlobalDate(index);
        });
        prev.addEventListener('click', function() {
            if (index === 0) {
                index = 3;
            } else {
                index--;
            }
            addContentGlobalDate(index);
        });
        home.addEventListener('click', function() {
            getGlobalDatatoDom();
            const startIndex = 0;
            addContentGlobalDate(startIndex);
            mapFlyToCenter();
            if (document.querySelector('.backlight')) {
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
    // let arrWork = objDataGlobal.countries;
    let startSort = 0;
    // arrWork = objDataGlobal.countries;
    arrWork.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
    addNewListCountries(startSort, arrWork);

    function addNewListCountries(sort, arrWork) {
        let listCountries = document.querySelectorAll('.countries .item-country');

        listCountries.forEach((item, i) => {
            //add name country
            item.textContent = arrWork[i].Country;
            item.setAttribute('data-name', arrWork[i].Country);
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
                case 6:
                    countForItem.textContent = ' - ' + arrWork[i].TCPeople.toLocaleString();
                    break;
                case 7:
                    countForItem.textContent = ' - ' + arrWork[i].TRPeople.toLocaleString();
                    break;
                case 8:
                    countForItem.textContent = ' - ' + arrWork[i].TDPeople.toLocaleString();
                    break;
                case 9:
                    countForItem.textContent = ' - ' + arrWork[i].lastDayTCPeople.toLocaleString();
                    break;
                case 10:
                    countForItem.textContent = ' - ' + arrWork[i].lastDayTRPeople.toLocaleString();
                    break;
                case 11:
                    countForItem.textContent = ' - ' + arrWork[i].lastdayTDPeople.toLocaleString();
                    break;
                default:
                    countForItem.textContent = ' - ' + arrWork[i].TotalConfirmed.toLocaleString();
            }
        });
    }

    //get data by country for click
    let selected;
    parentCountries.addEventListener('click', function(event) {
        clearBack();

        let target = event.target;
        while (target !== parentCountries) {
            if (target.tagName === 'LI') {
                const i = target.getAttribute('data-id');
                const countryName = target.innerText.slice(0, target.innerText.indexOf('-') - 1);

                viewDataForCountry(i);
                backlight(target);
                mapFly(countryName);

                function backlight(item) {
                    if (selected) {
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
        // const newConfirmedForPeople = Math.round(objDataGlobal.newConfirmed / countPeople);
        // const newRecoveredForPeople = Math.round(objDataGlobal.newRecovered / countPeople);
        // const newDeathsForPeople = Math.round(objDataGlobal.newDeaths / countPeople);

        const newConfirmedForPeople = Math.round(item.NewConfirmed / countPeople);
        const newRecoveredForPeople = Math.round(item.NewRecovered / countPeople);
        const newDeathsForPeople = Math.round(item.NewDeaths / countPeople);

        arrData = [
            [item.TotalConfirmed, item.TotalRecovered, item.TotalDeaths, `Data for the ${markerName}`, '(absolute values)'],
            [item.NewConfirmed, item.NewRecovered, item.NewDeaths, `Data for the last day (${markerName})`, '(absolute values)'],
            [totalConfirmedForPeople, totalRecoveredForPeople, totalDeathsForPeople, `Data for the ${markerName}`, '(per 100 thousand population)'],
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
            if (index === 11) {
                index = 0;
            } else {
                index++;
            }
            clearBack();
            sortDate(index);

        });
        prev.addEventListener('click', function() {
            if (index === 0) {
                index = 11;
            } else {
                index--;
            }
            clearBack();
            sortDate(index);

        });
    }

    //sort data by countries
    function sortDate(i) {
        let text = document.querySelector('.title-toggle');
        let arrWork;
        arrWork = objDataGlobal.countries;
        switch (i) {
            case 0:
                // arrWork = objDataGlobal.countries;
                arrWork.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
                text.textContent = 'global by country confirmed';
                break;
            case 1:
                // arrWork = objDataGlobal.countries;
                arrWork.sort((a, b) => b.TotalRecovered - a.TotalRecovered);
                text.textContent = 'global by country recovered';
                break;
            case 2:
                // arrWork = objDataGlobal.countries;
                arrWork.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
                text.textContent = 'global by country deaths';
                break;
            case 3:
                // arrWork = objDataGlobal.countries;
                arrWork.sort((a, b) => b.NewConfirmed - a.NewConfirmed);
                text.textContent = 'last day by country confirmed';
                break;
            case 4:
                // arrWork = objDataGlobal.countries;
                arrWork.sort((a, b) => b.NewRecovered - a.NewRecovered);
                text.textContent = 'last day by country recovered';
                break;
            case 5:
                // arrWork = objDataGlobal.countries;
                arrWork.sort((a, b) => b.NewDeaths - a.NewDeaths);
                text.textContent = 'last day by country deaths';
                break;
            case 6:
                // arrWork = objDataGlobal.countries;
                arrWork.sort((a, b) => b.TCPeople - a.TCPeople);
                text.textContent = 'global by country confirmed (per 100 th)';
                break;
            case 7:
                // arrWork = objDataGlobal.countries;
                arrWork.sort((a, b) => b.TRPeople - a.TRPeople);
                text.textContent = 'global by country recovered (per 100 th)';
                break;
            case 8:
                // arrWork = objDataGlobal.countries;
                arrWork.sort((a, b) => b.TDPeople - a.TDPeople);
                text.textContent = 'global by country deaths (per 100 th)';
                break;
            case 9:
                // arrWork = objDataGlobal.countries;
                arrWork.sort((a, b) => b.lastDayTCPeople - a.lastDayTCPeople);
                text.textContent = 'last day by country confirmed (per 100 th)';
                break;
            case 10:
                // arrWork = objDataGlobal.countries;
                arrWork.sort((a, b) => b.lastDayTRPeople - a.lastDayTRPeople);
                text.textContent = 'last day by country recovered (per 100 th)';
                break;
            case 11:
                // arrWork = objDataGlobal.countries;
                arrWork.sort((a, b) => b.lastdayTDPeople - a.lastdayTDPeople);
                text.textContent = 'last day by country deaths (per 100 th)';
                break;
            default:
                break;
        };
        addNewListCountries(i, arrWork);
    }

    function clearBack() {
        document.querySelectorAll('.countries .item-country').forEach((item) => {
            if (item.classList.contains('backlight')) {
                item.classList.remove('backlight');
            }
        });
    }
}