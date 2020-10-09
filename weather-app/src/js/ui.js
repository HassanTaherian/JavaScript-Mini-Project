class UI {
  constructor() {
    this.appContent = document.querySelector('.app-content');
    this.loadingImage = '<img src="img/loading.gif" id="load-img" class="img-fluid" >';
    this.loadingImageContainer = document.querySelector('.load-img-container');
    this.changeLocationForm = document.querySelector('#change-location');
    this.cityInput = document.querySelector('#city-input');
    this.cityElement = document.querySelector('.w-city');
    this.stateElement = document.querySelector('.w-state');
    this.tempElement = document.querySelector('.w-temp .value')
    this.humidityElement = document.querySelector('#w-humidity');
    this.pressureElement = document.querySelector('#w-pressure');
    this.feelsLikeElement = document.querySelector('#w-feels-like');
    this.weatherIcon = document.querySelector('.w-state-img');
    this.windElement = document.querySelector('#w-wind');
  }

  updateUI(data) {
    this.toggleAppInterface();
  
    let { temp, humidity, feels_like: feelsLike, pressure } = data.main;
  
    // City
    this.cityElement.textContent = data.name;
  
    // Weather state
    this.stateElement.textContent = data.weather[0].main;
  
    // Temprature
    temp = convertKelvinToCelisios(temp);
    this.tempElement.textContent = temp;
  
    // Hmidity
    this.humidityElement.textContent = humidity;
  
    // Pressure
    this.pressureElement.textContent = pressure;
  
    // Feels Like
    this.feelsLikeElement.textContent = feelsLike;

    this.weatherIcon.innerHTML = Weather.getWeatherIcon(data.weather[0].icon);
  
    // Wind
    const {speed: windSpeed, deg: windDegree} = data.wind;
    this.windElement.textContent = windSpeed + windDegree;
    this.toggleLoadImage(false);
  }
  
  toggleLoadImage(isLoading) {
   if (isLoading) {
    this.loadingImageContainer.innerHTML = this.loadingImage;
   } else {
    this.loadingImageContainer.innerHTML = null;
   } 
  }

  toggleAppInterface() {
    this.changeLocationForm.classList.toggle('d-none');
    this.appContent.classList.toggle('d-none');
  }
}