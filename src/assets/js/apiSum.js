const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

export function getApifunc() {
  fetch('https://api.covid19api.com/summary', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('summaryApi', JSON.stringify(data));
    })
    .catch(() => new Error());

  return JSON.parse(localStorage.getItem('summaryApi'));
}
getApifunc();
setTimeout(getApifunc, 10000);
