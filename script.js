const URLBase = 'https://api.openweathermap.org/data/2.5/weather'
const ApiKey = '4e1db7c4eba2e036bf313c7a32ae4a3c';
const diffKelvin = 273.15;

document.getElementById('searchBt').addEventListener('click', ()=>{
    const city = document.getElementById('inputCity').value;
    if (city != ''){
        // llamado a la api
        fetchWeather(city);
    }else{
        showError({message: 'Debe ingresar el nombre de la ciudad'});
    }
})


function fetchWeather(city) {
    fetch(`${URLBase}?q=${city}&appid=${ApiKey}&lang=es`)
        .then(data => data.json())
        .then(data => showWeatherData (data))
        .catch(error => showError(error))

}

function showWeatherData (data){
    let divResponse = document.getElementById('response');
    divResponse.innerHTML = '';

    const cityName = data.name;
    const countryName = data.sys.country;
    const temp = data.main.temp - diffKelvin;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const nameInfo = document.createElement('h2');
    nameInfo.textContent = `${cityName}, ${countryName}`;

    const tempInfo = document.createElement('p');
    tempInfo.textContent = `La temperatura acutal es: ${Math.floor(temp)}°C`;

    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `La humedad acutal es: ${humidity}%`;

    const iconInfo = document.createElement('img');
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const descriptionInfo = document.createElement('p');
    descriptionInfo.textContent = `Condicion meteorollógica actual: ${description}`;

    divResponse.appendChild(nameInfo);
    divResponse.appendChild(tempInfo);
    divResponse.appendChild(humidityInfo);
    divResponse.appendChild(iconInfo);
    divResponse.appendChild(descriptionInfo);
}

function showError(error){
    let divResponse = document.getElementById('response');
    divResponse.innerHTML = '';

    const message = error.message.includes('country') 
        ? 'La ciudad no existente' 
        : (error.message.includes('Debe ingresar')) 
            ? `${error.message}`
            : `Información no disponible. Disculpe`
    const errorInfo = document.createElement('p');
    errorInfo.textContent = `${message}`;

    errorInfo.style.color = "red";
    errorInfo.style.padding = "3px";
    errorInfo.style.backgroundColor = "pink";
    divResponse.appendChild(errorInfo);

    document.getElementById('inputCity').value ='';
    
}