const searchCountry = document.querySelector('.pick__country')
const nameOfCountry = document.querySelector('.name')
const countryList = document.querySelector('.country-list')
const hideList = document.querySelector('.close')
const input = document.getElementById('search__country')


function showAllCountries() {
    const numberOfCountries = country_list.length;

    let i = 0,
        changeUlListId;

    country_list.forEach((country, index) => {
        if (index % Math.ceil(numberOfCountries / listsNumber) == 0) {
            changeUlListId = `list-${i}`;
            countryList.innerHTML += `<ul id='${changeUlListId}'></ul>`;
            i++;
        }
        document.getElementById(`${changeUlListId}`).innerHTML += `
		<li onclick='fetchDataCountries("${country.name}")' id="${country.name}">
		${country.name}
		</li>

		`
    })
};
let listsNumber = 3;
showAllCountries();

hideList.addEventListener('click', () => {
    searchCountry.classList.add('hide');
});
nameOfCountry.addEventListener('click', () => {
    input.value = '';
    resetCountryList();
    searchCountry.classList.toggle('hide');
    searchCountry.classList.add('fadeIn');
    input.focus();
});
countryList.addEventListener('click', () => {
    searchCountry.classList.toggle('hide');
});

input.addEventListener('input', () => {
    let value = input.value.toUpperCase();

    country_list.forEach(country => {
        if (country.name.toUpperCase().startsWith(value)) {
            document.getElementById(country.name).classList.remove('hide');
        } else {
            document.getElementById(country.name).classList.add('hide');
        }
    })
})

const resetCountryList = () => {
    country_list.forEach(country => {
        document.getElementById(country.name).classList.remove('hide');
    })
}

// Work with api
const nameOFCountry = document.querySelector(".country .name");
const totalCasesValue = document.querySelector(".total__cases .value");
const newCasesValue = document.querySelector(".total__cases .new-value");
const recoveredValue = document.querySelector(".recovered .value");
const newRecoveredValue = document.querySelector(".recovered .new-value");
const deathsValue = document.querySelector(".deaths .value");
const newDeathsValue = document.querySelector(".deaths .new-value");

const ctx = document.getElementById("chart").getContext("2d");

let globalDataArr = [],
    casesArr = [],
    recoveredArr = [],
    deathsArr = [],
    deaths = [],
    datesArr = [];

let codeOfCountry = geoplugin_countryCode(),
    yourCountry;
country_list.forEach(country => {
    if (country.code === codeOfCountry) {
        yourCountry = country.name;
    }
})


function fetchDataCountries(country) {
    yourCountry = country;
    nameOFCountry.innerHTML = "Loading...";

    (casesArr = []),
    (recoveredArr = []),
    (deathsArr = []),
    (dates = []),
    (datesArr = []);

    let requestVariation = {
        method: "GET",
        redirect: "follow",
    };

    const fetchApi = async(country) => {
        await fetch(
                `https://api.covid19api.com/total/country/${country}/status/confirmed`,
                requestVariation
            )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.forEach((item) => {
                    dates.push(item.Date);
                    casesArr.push(item.Cases);
                });
            });

        await fetch(
                `https://api.covid19api.com/total/country/${country}/status/recovered`,
                requestVariation
            )
            .then((res) => {
                return res.json();
            })
            .then((data) => {

                data.forEach((item) => {
                    recoveredArr.push(item.Cases);
                });
            });

        await fetch(
                `https://api.covid19api.com/total/country/${country}/status/deaths`,
                requestVariation
            )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.forEach((item) => {
                    deathsArr.push(item.Cases);
                });
            });

        updateStatChart();
    };

    fetchApi(country);
}

fetchDataCountries(yourCountry);

// Update Statistics and Chart
function updateStatChart() {
    updateStatistics();
    chartIt();
}

function updateStatistics() {
    const totalCases = casesArr[casesArr.length - 1];

    const newCases = totalCases - casesArr[casesArr.length - 2];

    const totalRecovered = recoveredArr[recoveredArr.length - 1];
    const newRecoveredCases =
        totalRecovered - recoveredArr[recoveredArr.length - 2];

    const totalDeaths = deathsArr[deathsArr.length - 1];
    const newDeathsCases = totalDeaths - deathsArr[deathsArr.length - 2];

    nameOFCountry.innerHTML = yourCountry;
    totalCasesValue.innerHTML = totalCases;
    newCasesValue.innerHTML = `+${newCases}`;
    recoveredValue.innerHTML = totalRecovered;
    newRecoveredValue.innerHTML = `+${newRecoveredCases}`;
    deathsValue.innerHTML = totalDeaths;
    newDeathsValue.innerHTML = `+${newDeathsCases}`;

    // format dates
    dates.forEach((date) => {
        datesArr.push(formatDate(date));
    });
}

// UPDATE CHART
let chart;

function chartIt() {
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            datasets: [{
                    label: "Cases",
                    data: casesArr,
                    fill: false,
                    borderColor: "hsl(288, 97%, 71%)",
                    backgroundColor: "hsl(288, 97%, 71%)",
                    borderWidth: 1,
                },
                {
                    label: "Recovered",
                    data: recoveredArr,
                    fill: false,
                    borderColor: "hsl(106, 96%, 35%)",
                    backgroundColor: "hsl(106, 96%, 35%)",
                    borderWidth: 1,
                },
                {
                    label: "Deaths",
                    data: deathsArr,
                    fill: false,
                    borderColor: "#8B0000",
                    backgroundColor: "#8B0000",
                    borderWidth: 1,
                },
            ],
            labels: datesArr,
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
}

// FORMAT DATES
const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function formatDate(dateString) {
    let date = new Date(dateString);

    return `${date.getDate()} ${allMonths[date.getMonth() - 1]}`;
}