import { country_codes } from './country-codes';

const mapBox = 'pk.eyJ1IjoiZmVkb3JvdmljaHBhdmVsIiwiYSI6ImNraW5lcTkzMzBtMW8ycm81cTd6N3N3aDIifQ.botvkeUgOwWBdkRdCIwuWg';

mapboxgl.accessToken = mapBox;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 1.5,
  center: [40, 20],
});

const latlongMap = new Map();
country_codes.forEach((e) => latlongMap.set(e.country, [e.longitude, e.latitude]));

/* Определение местоположения
fetch("http://api.ipstack.com/37.215.40.61?access_key=4d45dec0ea3029c6c74945486042836a&format=1", requestOptions)
    .then(response => response.json())
    .then(data => { console.log(data) })
    */

const getMarkColor = (x) => {
  if (x <= 100) { return '#f6dddd'; }
  if (x <= 1000) { return '#f4b5b5'; }
  if (x <= 10000) { return '#fa8080'; }
  if (x <= 100000) { return '#f84848'; }
  return '#ae0000';
};

window.onload = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = JSON.parse(localStorage.getItem('summaryApi'));

  data.Countries.forEach((country) => {
    const { TotalConfirmed, Country } = country;
    new mapboxgl.Marker({
      color: getMarkColor(TotalConfirmed),
    })
      .setLngLat(latlongMap.get(Country))
      .addTo(map);
  });
};
