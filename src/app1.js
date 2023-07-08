import { useEffect, useState } from 'react';
import { getData } from './components/remfetch';

function App1() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [notificationDisplayed, setNotificationDisplayed] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      
      if (lat && lon && !notificationDisplayed) {
        const data = await getData(lat, lon);
        if (data.carryUmbrella) {
          displayNotification( 'Carry an Umbrella!','Rain Alert');
        } 
        else {
          displayNotification('NO need for an Umbrella!','No Rain Today');
        }
        setNotificationDisplayed(true);
      }
    };

    fetchWeatherData();
  }, [lat, lon, notificationDisplayed]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          console.log('Error retrieving geolocation:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  const displayNotification = (title, message) => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, { body: message });
        }
      });
    }
  };

  return null;
}

export default App1;

  