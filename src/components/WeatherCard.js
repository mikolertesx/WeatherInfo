import React, { useState } from "react";
import { getImageSourceFromName, getLocationData } from "../util/api";
import { getLocation } from "../util/api";

const WeatherCard = (props) => {
  const [locationString, setLocationString] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temperatureString, setTemperatureString] = useState(null);

  const clickPosition = async () => {
    console.log("Clicked");
    navigator.geolocation.getCurrentPosition( async (geoLocation) => {
      const lat = geoLocation.coords.latitude;
      const long = geoLocation.coords.longitude;

      props.onLocationChange({
        lat,
        long,
      });

      const locations = await getLocation(lat, long);
      const location = locations[0];
      const locationData = await getLocationData(location['woeid']);

      const currentWeather = locationData['consolidated_weather'][0];

      const maxTemp = currentWeather['max_temp'];
      const minTemp = currentWeather['min_temp'];
      const temp = currentWeather['the_temp'];

      setLocationString(`${location.title} by approximation`);
      setWeather(currentWeather['weather_state_name']);
      setTemperatureString(`${minTemp}° > ${temp}° < ${maxTemp}°`);
    });
  };

  let location = "Unknown location";
  if (props.location.lat && props.location.long) {
    location = `${props.location.lat}, ${props.location.long}`;
  }
  if (locationString !== null) {
    location = locationString;
  }

  return (
    <div className="weather-card">
      <div className="weather-info">
        <p>{location}</p>
        <p>{props.date}</p>
      </div>
      <div className="weather-presentation">
        <img src={weather ? getImageSourceFromName(weather): null} alt="Unknown Status" />
        <p>{weather || 'Unknown weather'}</p>
        <p>{temperatureString || 'Unknown temperature'}</p>
      </div>
      <button onClick={clickPosition}>Use my location</button>
    </div>
  );
};

export default WeatherCard;
