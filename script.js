const KEY = "3a6dd29275be73a5d003edc30e0ee0ea"
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
  // Hata mesajını gizle ve sonucu temizle
  document.querySelector(".error").style.display = "none"
  document.querySelector(".weather").style.display = "none"

  if (city === "") {
    document.querySelector(".error").style.display = "block"
  } else {
    const response = await fetch(URL + city + `&appid=${KEY}`)

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block"
    } else {
      const data = await response.json()
      console.log(data)
      document.querySelector(".city").innerHTML = data.name
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C"
      document.querySelector(
        ".feels-like"
      ).innerHTML = `Hissedilen ${Math.round(data.main.feels_like)}°C`
      document.querySelector(".humidity-detail").innerHTML =
        data.main.humidity + "%"
      document.querySelector(".wind-detail").innerHTML =
        data.wind.speed + " km/h"

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "imgs/clouds.png"
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "imgs/clear.png"
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "imgs/rain.png"
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "imgs/drizzle.png"
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "imgs/mist.png"
      }

      document.querySelector(".details").style.display = "flex"
      document.querySelector(".weather").style.display = "block" // Sonucu göster
    }
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value)
})
