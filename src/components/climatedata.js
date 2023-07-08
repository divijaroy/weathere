import { DateTime } from "luxon";

const API_KEY = "33c7ea9ee472c0aedfd1db242c0b1fa5";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

  const forclimate_data = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
 
     return fetch(url).then((res) => res.json());
  };







  const for_presentClimate = (data) => {
  const {
    weather,
    coord: { lat, lon },
    main: { temp,feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    dt,
    timezone,
    
    sys: { country ,sunrise,sunset},
    name,
  } = data;

  const { description, icon } = weather[0];
const {main} = weather[0];
  return {
    lat,
    lon,
    main,
    description,
     iconURL: makeIconURL(icon),
     dt,
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    sunrise,
    sunset,
    timezone,
    name,
  };
};

const main_climateData = async (searchParams) => {
  const formattedCurrentclimate = await forclimate_data(
    "weather",
    searchParams
  ).then(for_presentClimate);
  return { ...formattedCurrentclimate};
};


 

const timeTOLocal = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => {
  const utcDateTime = DateTime.fromSeconds(secs, { zone: "utc" });
  const localDateTime = utcDateTime.setZone(zone / 60);
  const localTime = localDateTime.toFormat(format);
  return localTime;
};

export { main_climateData };
export { timeTOLocal };