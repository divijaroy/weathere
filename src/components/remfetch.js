 

const getData = async (lat, lon) => {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=9&appid=33c7ea9ee472c0aedfd1db242c0b1fa5`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  const weatherData = data.list;
  let carryUmbrella = false;

  for (let i = 1; i < weatherData.length; i++) {
    const { weather, dt_txt} = weatherData[i];
     const { main } = weather[0];

    console.log(dt_txt);
     console.log(main);

    if (main ==="Rain" ||main ==="Drizzle"||main ==="Thunderstorm") {
      carryUmbrella = true;
      break;
    }

    if (dt_txt.includes('00:00:00')) {
      break;
    }
  }

  return {
    carryUmbrella,
   };
};

export { getData };
