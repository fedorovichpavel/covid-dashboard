import { country_codes } from './country-codes';
import { fetchDataCountries } from './script';
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
map.addControl(new mapboxgl.FullscreenControl({}));



const latlongMap = new Map();
country_codes.forEach((e) => latlongMap.set(e.country, [e.longitude, e.latitude]));

const getMarkColor = (x, y, get) => {
    const arr = [
        [1000, 10000, 100000],
        [1000, 10000, 100000],
        [10, 100, 1000]
    ];
    if (get) {
        switch (y) {
            case 0:
                return ['#f4d8b5', '#fac079', '#faa53c', '#fa8a00'];
            case 1:
                return ['#c3fcbc', '#89ff7b', '#56ff42', '#1bff00'];
            default:
                return ['#f4b5b5', '#fa8080', '#f84848', '#ae0000'];
        }
    }
    switch (y) {
        case 0:
            if (x <= arr[y][0]) { return '#f4d8b5'; }
            if (x <= arr[y][1]) { return '#fac079'; }
            if (x <= arr[y][2]) { return '#faa53c'; }
            return '#fa8a00';
        case 1:
            if (x <= arr[y][0]) { return '#c3fcbc'; }
            if (x <= arr[y][1]) { return '#89ff7b'; }
            if (x <= arr[y][2]) { return '#56ff42'; }
            return '#1bff00';
        default:
            if (x <= arr[y][0]) { return '#f4b5b5'; }
            if (x <= arr[y][1]) { return '#fa8080'; }
            if (x <= arr[y][2]) { return '#f84848'; }
            return '#ae0000';
    }

};

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
};

export function mapFlyToCenter() {
    return map.flyTo({
        center: [50, 20],
        zoom: 0.5,
        essential: true,
        speed: 0.7
    });
}

export function mapFly(name) {
    if (typeof name == 'object') {
        return map.flyTo({
            center: name,
            zoom: 4,
            essential: true,
            speed: 0.7
        });
    }
    return map.flyTo({
        center: latlongMap.get(name),
        zoom: 4,
        essential: true,
        speed: 0.7
    });
}

document.querySelector('.icon-menu-zoom').addEventListener('click', () => {
    map.flyTo({
        center: [50, 20],
        zoom: 0.5,
        essential: true,
        speed: 1.3
    });
});



export function addMapOpt(data) {
    const prev = document.querySelector('.map-prev');
    const next = document.querySelector('.map-next');
    const arrTitle = ['Map Confirmed', 'Map Recovered', 'Map Deaths']
    const arrType = ['TotalConfirmed', 'TotalRecovered', 'TotalDeaths'];
    const arrLegNum = [
        ['1000', '10 000', '100 000'],
        ['1000', '10 000', '100 000'],
        ['10', '100', '1000']
    ];
    const arrPopupTitle = ['confirmed', 'recovered', 'deaths'];

    function selectMapData() {
        let index = 0;
        next.addEventListener('click', function() {
            document.querySelectorAll('.marker').forEach(e => e.remove());
            if (index === 2) {
                index = 0;
            } else {
                index++;
            }
            generateMapData(index);
        });
        prev.addEventListener('click', function() {
            document.querySelectorAll('.marker').forEach(e => e.remove());
            if (index === 0) {
                index = 2;
            } else {
                index--;
            }
            generateMapData(index);
        });
    }
    selectMapData();
    generateMapData(0);

    function generateMapData(index) {
        document.querySelector('.map__title').innerHTML = `${arrTitle[index]} (for the world <i>${data.Global[arrType[index]]}</i>)`;
        document.querySelector('.map__title > i').style.color = `${getMarkColor(1, index, true)[3]}`;
        const mapLegend = document.querySelector('.map-legend');
        mapLegend.innerHTML = `<div class='map_leg1'></div> < ${arrLegNum[index][0]} <div class='map_leg2'></div> < ${arrLegNum[index][1]} <div class='map_leg3'></div> < ${arrLegNum[index][2]}<div class='map_leg4'></div> > ${arrLegNum[index][2]}`;
        document.querySelector('.map_leg1').style.backgroundColor = getMarkColor(1, index, true)[0];
        document.querySelector('.map_leg2').style.backgroundColor = getMarkColor(1, index, true)[1];
        document.querySelector('.map_leg3').style.backgroundColor = getMarkColor(1, index, true)[2];
        document.querySelector('.map_leg4').style.backgroundColor = getMarkColor(1, index, true)[3];
        data.Countries.forEach((country, i) => {
            const marker = document.createElement('div');
            marker.className = 'marker';
            marker.setAttribute('data-id', i);
            marker.setAttribute('data-ccc', country.Country);
            marker.style.backgroundColor = getMarkColor(country[arrType[index]], index);
            new mapboxgl.Marker({
                    element: marker
                })
                .setLngLat(latlongMap.get(country.Country))
                .addTo(map);
        });

        function addPopup(i) {
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            popup.setLngLat(latlongMap.get(data.Countries[i].Country)).setHTML(`<strong>${data.Countries[i].Country}</strong>: ${arrPopupTitle[index]} ${data.Countries[i][arrType[index]]}`).addTo(map);
        }
        const allMap = document.querySelector('.map');

        allMap.addEventListener('click', function(event) {
            const target = event.target;
            if (target.className.slice(0, 6) !== 'marker') { return; } else {
                const id = target.getAttribute('data-id');
                mapFly(data.Countries[id].Country);
                document.querySelector(`[data-name="${data.Countries[id].Country}"]`).scrollIntoView({ behavior: "smooth" });
                document.querySelector(`[data-name="${data.Countries[id].Country}"]`).click();
                fetchDataCountries(data.Countries[id].Country);
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

    }
}