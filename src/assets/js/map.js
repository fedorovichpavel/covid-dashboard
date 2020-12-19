import { country_codes } from './country-codes';

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
country_codes.forEach((e) => latlongMap.set(e.country, [e.longitude, e.latitude]));

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
