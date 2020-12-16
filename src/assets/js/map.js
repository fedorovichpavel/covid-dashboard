import { country_codes } from './country-codes';
import { getApifunc, firstData } from './apiSum';

const mapBox = 'pk.eyJ1IjoiZmVkb3JvdmljaHBhdmVsIiwiYSI6ImNraW5lcTkzMzBtMW8ycm81cTd6N3N3aDIifQ.botvkeUgOwWBdkRdCIwuWg';

mapboxgl.accessToken = mapBox;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 1.5,
    center: [40, 20]
});



let latlongMap = new Map();
country_codes.forEach(e => latlongMap.set(e.country, [e.longitude, e.latitude]));



/* Определение местоположения  
fetch("http://api.ipstack.com/37.215.40.61?access_key=4d45dec0ea3029c6c74945486042836a&format=1", requestOptions)
    .then(response => response.json())
    .then(data => { console.log(data) })
    */

const getMarkColor = x => {
    if (x <= 100) { return '#f6dddd'; }
    if (x <= 1000) { return '#f4b5b5'; }
    if (x <= 10000) { return '#fa8080'; }
    if (x <= 100000) { return '#f84848'; }
    return '#ae0000';
}



window.onload = async() => {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    let data = JSON.parse(localStorage.getItem('summaryApi'));

    data.Countries.forEach(country => {
        const { TotalConfirmed, Country } = country;
        new mapboxgl.Marker({
                color: getMarkColor(TotalConfirmed)
            })
            .setLngLat(latlongMap.get(Country))
            .addTo(map);
    });
};

/*

fetch("https://api.covid19api.com/summary", requestOptions)
    .then(response => response.json())
    .then(data => {
        const { Global, Countries, Date } = data;
        // console.log(data);

        Countries.forEach(country => {
            const { NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered, Country } = country;
            new mapboxgl.Marker({
                    color: getMarkColor(TotalConfirmed)
                })
                .setLngLat(latlongMap.get(Country))
                .addTo(map);

        });

    })
    .catch(error => console.log('error', error));

    */