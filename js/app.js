
let targetNow = document.querySelector('main div section:nth-child(1) p')
let targetIn3Hours = document.querySelector('main div section:nth-child(2) p')
let targetTomorrow = document.querySelector('main div section:nth-child(3) p')
let request = new XMLHttpRequest()

let city = document.querySelector('main section:first-child input')
let click = document.querySelector('main section:first-child button')



let displayWeather = () => {
    let requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=46360059671f55734266b0751f95671e`

    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let response = JSON.parse(this.responseText)

            let display = (target, t) => {
                let iconURL = `https://openweathermap.org/img/wn/${response.list[t].weather[0].icon}.png`
                let tempCelsius = kelvinToCelsius(response.list[t].main.temp)

                target.innerHTML = `<img src="${iconURL}" alt=""><br>
                                 <i class="fas fa-thermometer-half"></i> ${tempCelsius}°C<br>
                                 <i class="fas fa-wind"></i> ${response.list[t].wind.speed} m/s`
            }
            display(targetNow, 0)
            display(targetIn3Hours, 1)
            display(targetTomorrow, 2)
        }
    }
    request.open('GET', requestURL)
    request.send()
}

click.addEventListener('click', () => {
    displayWeather()
})

city.addEventListener('keydown', (e) => {
    if (e.key == "Enter")
        displayWeather()
});

let kelvinToCelsius = (kelvin) => {
    let celsius = kelvin - 273.15
    return Number.parseFloat(celsius).toFixed(2)
}

request.open('GET', requestURL)
request.send()
