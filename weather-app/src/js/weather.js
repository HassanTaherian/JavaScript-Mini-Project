// Event Listeners
function loadAllEventListeners() {
  // Change Location

  new UI().changeLocationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ui = new UI(),
      weather = new Weather(city);

    const city = ui.cityInput.value;
    ui.toggleLoadImage(true);
    ui.toggleAppInterface();
    cityInput.value = '';

    weather.getWeather().then(data => { ui.updateUI(data); })
      .catch(e => console.log(e.messgae))
  });
}

loadAllEventListeners()

class Weather {
  constructor(city = 'Tehran') {
    this.apiKey = "b874590fcabbd276ec40594fd76fd533";
    this.city = city;
  }

  getCityURL() {
    return `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`;
  }

  getWeather = async _ => {
    const ui = new UI();
    try {
      const response = await fetch(this.getCityURL(this.city));

      if (response.status === 404) {
        throw new Error('404 Error')
      }
      const data = await response.json();
      return data;
    } catch (e) {
      ui.toggleAppInterface();
      handleNotFindCity(this.city);
    }
  }

  static getWeatherIcon(iconId) {
    return `<img 
    src="http://openweathermap.org/img/wn/${iconId}@2x.png"
    alt="Weather State Icon" />
    `;
  }
}

// Get user location
loadUserLocation = async (positon) => {
  const ui = new UI();
  ui.toggleLoadImage(true);
  const { latitude, longitude } = positon.coords;

  // Fetch info form API
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${locationAPIKey}`);
  const data = await response.json();
  const city = data.results[0].components.city;
  localStorage.setItem('userCity', city);
  const weather = new Weather(city);
  weather.getWeather().then(data => { ui.updateUI(data); })
}


function init() {
  const userCity = localStorage.getItem('userCity'),
    ui = new UI();
  if (userCity) {
    const weather = new Weather(userCity);
    ui.toggleLoadImage(true);
    weather.getWeather().then(data => { ui.updateUI(data); })
  } else {
    navigator.geolocation.getCurrentPosition(loadUserLocation, unknownLocation);
  }
}

init();

// We can user class fields instead of declare global variable
// We must declare functions that will do onething (and don't call a function that doesn't relative to them, instead we can leave it to invoker function)
// We can place our UI variables into UI class constructor (Tip 1)