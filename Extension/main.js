const geoURL = 'https://freegeoip.app/json/';
// const key = 'd4ed96f83af6fc00c1799436b53137b6';
const key = '1ef8550400ece86661dfa0fc0e0af7d7';
const city = 'Moscow';
const weatUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=ru`;


const elemHide = (element, time) => {
  setTimeout(() => {
    element.setAttribute('hidden', '');
  }, time);
}

const elemShow = (element, time) => {
  setTimeout(() => {
    element.removeAttribute('hidden');
  }, time);
}

const getDate = () => {
  const postData = document.querySelector('.header-data');

  const daysList = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const monthList = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентрябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  const data = `${daysList[new Date().getDay()]}, ${new Date().getDate()}, ${monthList[new Date().getMonth()]}`;
  postData.innerHTML = data;
}

getDate();

const changeScale = () => {
  const postScale = document.querySelector('.header-temp');
  postScale.addEventListener('click', () => {
    postScale.innerHTML = postScale.innerHTML === '°F' ? '°C' : '°F';

  });
}

changeScale();

const myRequest = new XMLHttpRequest();

function getPromiseDate(newUrl) {
  return new Promise((resolve, regect) => {
    console.log('Loading...');
    myRequest.open('GET', newUrl);
    myRequest.send();
    myRequest.onload = () => {
      const status = myRequest.status;
      status < 400 ? resolve(myRequest.response) : console.log('Ошибка запроса')
    };
  });
}

const createdWeatherWeek = (data, weather, icon) => {

  const hoursWeatherBlock = document.createElement('div'),
    hoursWeather = document.createElement('span'),
    iconWeather = document.createElement('img')
  tempWeather = document.createElement('strong');
  hoursWeather.innerHTML = data.slice(-8, -6);
  iconWeather.src = `http://openweathermap.org/img/w/${icon}.png`
  tempWeather.innerHTML = `${weather}°`;

  hoursWeatherBlock.className = 'weather-hours';
  hoursWeatherBlock.appendChild(hoursWeather);
  hoursWeatherBlock.appendChild(iconWeather);
  hoursWeatherBlock.appendChild(tempWeather);

  document.querySelector('.weather-today').appendChild(hoursWeatherBlock);
}

const setLocalContent = (region, city) => {
  if (region) {
    document.querySelector(".main-city").innerHTML = `${region}, ${city}`;
  } else {
    document.querySelector(".main-city").innerHTML = 'Ошибка';
  }
}

const setLocalDate = (local) => {
  const region = local.region_name;
  const city = local.city
  setLocalContent(region, city);
}

const setWeatherContent = (weatherMath, description, temp_min, temp_max) => {
  document.querySelector(".main-temp").innerHTML = weatherMath;
  document.querySelector(".main-temp-max").innerHTML = `${temp_min}° / ${temp_max}°`;
  document.querySelector(".main-desc").innerHTML = description;
}

const setBackground = (time) => {
  const carrTime = time.slice(-8, -6);
  console.log(carrTime);
  const appBG = document.querySelector('.app');

  switch (carrTime) {
    case '18':
      appBG.style.backgroundColor = '#FDC830';
      appBG.style.backgroundImage = 'linear-gradient(to right, #F37335, #FDC830)';
    case '21':
      appBG.style.backgroundColor = '#0093E9';
      appBG.style.backgroundImage = 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)';
    default:
      appBG.style.backgroundColor = '#0093E9';
      appBG.style.backgroundImage = 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)';
  }
}

const setWeatherDate = (weather) => {
  const toDegC = (value, scale) => {
    return (scale === 'C' ? Math.round(value - 273) : Math.round((value * 9 / 5) - 459.67));
  }
  weather.list.slice(0, 1).forEach((elem) => {
    const weatherMath = toDegC(elem.main.temp, 'C');
    const description = elem.weather[0].description;
    const temp_min = toDegC(elem.main.temp_min, 'C');
    const temp_max = toDegC(elem.main.temp_max, 'C');
    const dt_txt = elem.dt_txt;
    setWeatherContent(weatherMath, description, temp_min, temp_max);
    setBackground(dt_txt);
  })
  weather.list.slice(0, 5).forEach((elem) => {
    const weatherMathFive = toDegC(elem.main.temp, 'C');
    const dt_txt = elem.dt_txt;
    const icon = elem.weather[0].icon;
    createdWeatherWeek(dt_txt, weatherMathFive, icon);
  })
}

const getLocalDate = (url) => {
  getPromiseDate(url).then(data => {
    setLocalDate(JSON.parse(data))
  })
}

const getWeatherDate = (url) => {
  getPromiseDate(url).then(data => {
    setWeatherDate(JSON.parse(data))
  })
}

const startApp = () => {
  elemShow(document.querySelector('.spinner__wrapper'), 0);
  setTimeout(() => {
    elemHide(document.querySelector('.spinner__wrapper'), 0);

    getLocalDate(geoURL);
  }, 1000);
}
getWeatherDate(weatUrl);
startApp();
