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
    if (x <= 1000) { return '#f4b5b5'; }
    if (x <= 10000) { return '#fa8080'; }
    if (x <= 100000) { return '#f84848'; }
    return '#ae0000';
};

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
};


export function mapFly(name) {
    return map.flyTo({
        center: latlongMap.get(name),
        zoom: 4,
        essential: true
    });
}

fetch('https://api.covid19api.com/summary', requestOptions)
    .then((response) => response.json())
    .then((data) => {



        data.Countries.forEach((country, i) => {
            const { TotalConfirmed, Country } = country;
            const marker = document.createElement('div');
            marker.className = 'marker';
            marker.setAttribute('data-id', i);
            marker.style.backgroundColor = getMarkColor(TotalConfirmed);
            new mapboxgl.Marker({
                    color: getMarkColor(TotalConfirmed),
                    element: marker
                })
                .setLngLat(latlongMap.get(Country))
                .addTo(map);
        });

        document.querySelector('.map__title').innerHTML = 'Map Global for the World';
        const mapLegend = document.querySelector('.map-legend');
        mapLegend.innerHTML = "<div class='map_leg1'></div> < 1000 <div class='map_leg2'></div> < 10 000 <div class='map_leg3'></div> < 100 000<div class='map_leg4'></div> > 100 000";




        function addPopup(i) {
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });
            popup.setLngLat(latlongMap.get(data.Countries[i].Country)).setHTML(`<strong>${data.Countries[i].Country}</strong>: confirmed ${data.Countries[i].TotalConfirmed}`).addTo(map);
        }

        const allMap = document.querySelector('.map');

        allMap.addEventListener('click', function(event) {
            const target = event.target;
            if (target.className.slice(0, 6) !== 'marker') { return; } else {
                const id = target.getAttribute('data-id');
                mapFly(data.Countries[id].Country);
            }
        });

        allMap.addEventListener('mouseover', function(event) {
            const target = event.target;
            if (target.className.slice(0, 6) !== 'marker') { return; } else {
                const i = target.getAttribute('data-id');
                addPopup(i);
            }

            allMap.addEventListener('mouseout', function(event) {
                const target = event.target;
                if (target.className.slice(0, 6) !== 'marker') { return; } else {
                    if (document.querySelector('.mapboxgl-popup')) document.querySelector('.mapboxgl-popup').remove();
                }
            });
        });

    })
    .catch(() => new Error());