import { dataCountry } from './dataCountry';

let listCountries = [];
listCountries = dataCountry.map((item) => item.name);
const searchElem = document.querySelector('[name = "country"]');
let arr;
let value = document.querySelector('[name = "country"]');


//create list from search
createListCountries();

//search
searchElem.addEventListener('click', searchCountry);
document.querySelector('.search-country').addEventListener('click', hiddenListSearch);

function searchCountry() {
  document.querySelector('[name = "country"]').value = '';
  document.querySelector('.list-search').classList.remove('hide-search');
  searchElem.addEventListener('input', function() {
    let value = document.querySelector('[name = "country"]').value;
    arr.forEach(country => {
      if (country.textContent.startsWith(value)) {
        country.classList.remove('hide');
      } else {
        country.classList.add('hide');
      }
    })
  });

  let index;
  document.querySelector('.list-search').addEventListener('click', function(event) {
    if (event.target.tagName === 'P') {
      value.value = event.target.textContent;
      hiddenListSearch();
      let arrListCountries = document.querySelectorAll('.item-country');
      let z = [];
      arrListCountries.forEach((item) => z.push(item));
      // console.log(z);
      let x = [];
      arrListCountries.forEach((item) => x.push(item.textContent));
      let a = x.filter((item) => item.indexOf(value.value) !== -1);
      // console.log(a);

      // console.log('res search - ', z.filter((item) => item.textContent == a));
      let test = z.filter((item) => item.textContent == a)[0];
      let y = z.indexOf(test);
      // console.log(y);
      // console.log(arrListCountries[y]);
      arrListCountries[y].classList.add('backlight');
      // console.log(index);
      // arrListCountries[index].classList.add('backlight');
    }
  })

}

function createListCountries() {
  let wrapListSearch = document.createElement('div');
  wrapListSearch.classList.add('list-search', 'hide-search');
  document.querySelector('.toggle-country').appendChild(wrapListSearch);
  listCountries.forEach((item, i) => {
    let itemList = document.createElement('p');
    itemList.classList.add('item-list-search');
    itemList.textContent = item;
    wrapListSearch.appendChild(itemList);
  });
  arr = document.querySelectorAll('.item-list-search');
}

function hiddenListSearch() {
  document.querySelector('.list-search').classList.add('hide-search');
  arr.forEach((item) => {
    item.classList.remove('hide');
  });
}
