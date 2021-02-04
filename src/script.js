const geoURL = 'https://freegeoip.app/json/';
const key = 'd4ed96f83af6fc00c1799436b53137b6';
const url = `http://api.openweathermap.org/data/2.5/forecast?q=Moscow&appid=${key}&lang=ru`;


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



const xhr = new XMLHttpRequest();

const getResult = (data) => {
  
  xhr.open( 'GET', data, true )
  xhr.send()
  xhr.onload = function () {
    return  xhr.responseText
  }
  return
}

const parseLocationDate = (data) => {
  console.log(data);
  const resp = JSON.parse(data);
  const city = resp.city;
  return {
    city: city,
  };
};


const getLocal = () => {
  let city;
  const result = getResult(geoURL);
  parseLocationDate(result);

  return city;
}

getLocal();