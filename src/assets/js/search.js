export function search(listCountriesData) {
    let listCountries = listCountriesData.Countries.map(e => e.Country);
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
                if (event.target == null || document.querySelector(`[data-name="${event.target.innerText}"]`) == null) { return; }
                document.querySelector(`[data-name="${event.target.innerText}"]`).scrollIntoView({ behavior: "smooth" });
                document.querySelector(`[data-ccc="${event.target.innerText}"]`).click();
                hiddenListSearch();
            } else { return }
        });

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

}