const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
getApifunc();


export function getApifunc() {
    fetch("https://api.covid19api.com/summary", requestOptions)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('summaryApi', JSON.stringify(data));
        })
        .catch(error => console.log('error', error));

    return JSON.parse(localStorage.getItem('summaryApi'));
}


setTimeout(getApifunc, 10000);