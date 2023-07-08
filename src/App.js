 

import hotBg from "./assets/hot.jpg";
import cloudyBg from "./assets/cloudy.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { timeTOLocal } from "./components/climatedata";
import cloudBg from "./assets/cloud.jpg";
import snowBg from "./assets/snow.jpg";
import videoBg from "./assets/light.mp4";
import Information from "./components/cards";
import { useEffect, useState, useRef } from "react";
import { main_climateData } from "./components/climatedata";
import CanvasAnimation from "./components/animation/down";
import CanvasAnimation1 from "./components/animation/up";
import CanvasAnimation2 from "./components/animation/fall";
import CanvasAnimation3 from "./components/animation/ldown";
import App1 from './app1';

function App() {
  const [query, newQuery] = useState({ q: "Torshavn" });
  const [city, newCity] = useState("");
  const [weather, newWeather] = useState(null);
  const [units, newUnits] = useState("metric");
  const [bg, newBg] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const takeClimateData = async () => {
      try {
        const data = await main_climateData({ ...query, units });
        if (data) {
          newWeather(data);
           const climateCondition = data.main;
          if (climateCondition === "Thunderstorm") {
            newBg(videoBg);
          } else if (climateCondition === "Snow") {
            newBg(snowBg);
          } else if (climateCondition === "Clouds") {
            newBg(cloudBg);
          } else if (climateCondition === "Rain" || climateCondition === "Drizzle") {
            newBg(cloudyBg);
          } else {
            newBg(hotBg);
          }
        } else {
          setErrorMessage("No data available for the entered city.");
        }
      } catch (error) {
        setErrorMessage("Sorry! City not yet registered.");
      }
    };

    takeClimateData();
  }, [query, units]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    newUnits(isCelsius ? "metric" : "imperial");
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setsuccessMessage("Weather retrieved successfully!");

        newQuery({
          lat,
          lon,
        });
      });
    }
  };

  const handleSearchClick = () => {
    if (city !== "") newQuery({ q: city });
  };

  const handleVoiceSearchClick = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.onresult = handleVoiceRecognitionResult;
      recognitionRef.current.onend = handleVoiceRecognitionEnd;
    }

    recognitionRef.current.start();
  };

  const handleVoiceRecognitionResult = async (event) => {
 
    const transcript = event.results[0][0].transcript;  
    const modifiedTranscript = transcript.replace(/\.$/, '');
     newCity(modifiedTranscript); 
  
    try {
      const data = await main_climateData({ q: modifiedTranscript, units });
      if (data) {
        newWeather(data);
         const climateCondition = data.main;
        if (climateCondition === "Thunderstorm") {
          newBg(videoBg);
        } else if (climateCondition === "Snow") {
          newBg(snowBg);
        } else if (climateCondition === "Clouds") {
          newBg(cloudBg);
        } else if (climateCondition === "Rain" || climateCondition === "Drizzle") {
          newBg(cloudyBg);
        } else {
          newBg(hotBg);
        }
        setsuccessMessage("Weather retrieved successfully!");
      } else {
        setErrorMessage("No data available for the entered city.");
      }
    } catch (error) {
      setErrorMessage("Sorry! City not yet registered.");
    }
  };

  const handleVoiceRecognitionEnd = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const isVideoBg = bg === videoBg;

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setsuccessMessage("");
      }, 2700);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [successMessage]);

  return (
    <div className="app" style={isVideoBg ? {} : { backgroundImage: `url(${bg})` }}>
      {isVideoBg ? (
        <video autoPlay loop muted className="video-background">
          <source src={videoBg} type="video/mp4" />
        </video>
      ) : null}

      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section sectionInputs">
            
            <div className="input-wrapper">
    <input
      value={city}
      onChange={(e) => newCity(e.currentTarget.value)}
      type="text"
      id="city-input"
      name="city"
      placeholder="Enter City..."
    />
    <button onClick={handleVoiceSearchClick} className="voice-button">
      <FontAwesomeIcon icon={faMicrophone} />
    </button>
  </div>
               <button onClick={(e) => handleSearchClick(e)}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <button onClick={handleLocationClick}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </button>
              <button onClick={handleUnitsClick}>°F</button>
             
            </div>

            {errorMessage && (
              <div className="notification">
                <p>{errorMessage}</p>
              </div>
            )}
            {successMessage && (
              <div className="snotification">
                <p>{successMessage}</p>
              </div>
            )}

            <div className="section sectionTemperature">
              <div className="icon">
                <h2>{weather.name},</h2>
                <h2>{weather.country}</h2>
                <img className="iconimg" src={weather.iconURL} alt="weatherIcon" loading="lazy" />
                <h3>{weather.main}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}</h1>
                <h2>{timeTOLocal(weather.dt, weather.timezone)}</h2>
              </div>
            </div>

            <Information weather={weather} units={units} />
          </div>
        )}
      </div>
      {bg === cloudyBg && <CanvasAnimation />}
      {bg === hotBg && <CanvasAnimation1 />}
      {bg === snowBg && <CanvasAnimation2 />}
      {bg === cloudBg && <CanvasAnimation3 />}
     
       <App1 />

       
     
    </div>
    
  );
}

export default App;
 