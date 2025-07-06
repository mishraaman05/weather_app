document.querySelector('button').addEventListener('click',()=>{

const place = document.getElementById('cityInput').value

function updateInfo(data){
    document.getElementById('city').innerText = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
    document.getElementById('weatherIcon').innerHTML = `<img src="${data.current.condition.icon}" alt=""></img>`
    document.getElementById('temperature').innerText = `${data.current.temp_c} °C`;
    document.getElementById('conditions').innerText = `${data.current.condition.text}`;
    document.getElementById('wind').innerText = `${data.current.wind_kph} km/h`;
    document.getElementById('humidity').innerText = `${data.current.humidity} %`;
    document.getElementById('time').innerText = `${data.location.localtime}`;
}

// Keep your code, add rain handler
const prom = fetch(`http://api.weatherapi.com/v1/current.json?key=6b755f19436744da9c425509250607&q=${place}&aqi=yes`)

prom
.then(response => response.json())
.then(data => {
    updateInfo(data);
    handleRainEffect(data.current.condition.text);
})
.catch(error => error)

})

function handleRainEffect(conditionText) {
    const condition = conditionText.toLowerCase();
    const rainContainer = document.getElementById('rainContainer');
    rainContainer.innerHTML = '';

    if (condition.includes("rain")) {
        for (let i = 0; i < 100; i++) {
            const drop = document.createElement('div');
            drop.classList.add('drop');
            drop.style.left = `${Math.random() * 100}vw`;
            drop.style.animationDuration = `${0.5 + Math.random()}s`;
            drop.style.animationDelay = `${Math.random()}s`;
            rainContainer.appendChild(drop);
        }
    }
}
