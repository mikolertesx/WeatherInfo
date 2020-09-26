import React, { useState } from "react";

import Status from "../util/status";
import { getImageSourceFromName, getLocationData } from "../util/api";

import { getLocation } from "../util/api";

import "./weatherCard.css";

const WeatherCard = (props) => {
  const [currentStatus, setCurrentStatus] = useState(Status.UNSTARTED);
  const [locationString, setLocationString] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temperatureString, setTemperatureString] = useState(null);

  const clickPosition = async () => {
    setCurrentStatus(Status.LOADING);
    navigator.geolocation.getCurrentPosition(
      async (geoLocation) => {
        const lat = geoLocation.coords.latitude;
        const long = geoLocation.coords.longitude;

        props.onLocationChange({
          lat,
          long,
        });

        try {
          const locations = await getLocation(lat, long);
          const location = locations[0];
          const locationData = await getLocationData(location["woeid"]);

          const currentWeather = locationData["consolidated_weather"][0];

          const maxTemp = currentWeather["max_temp"];
          const minTemp = currentWeather["min_temp"];
          const temp = currentWeather["the_temp"];

          setLocationString(`${location.title} by approximation.`);
          setWeather(currentWeather["weather_state_name"]);
          setTemperatureString(`${minTemp}° > ${temp}° < ${maxTemp}°`);
          setCurrentStatus(Status.READY);
        } catch (error) {
          setCurrentStatus(Status.ERROR);
          console.log(error);
        }
      },
      (error) => {
        console.log(error);
        setCurrentStatus(Status.ERROR);
      }
    );
  };

  let location = "Unknown location";
  if (props.location.lat && props.location.long) {
    location = `${props.location.lat}, ${props.location.long}`;
  }
  if (locationString !== null) {
    location = locationString;
  }

  let iconOrQuestion = weather ? (
    <div className="weather-img-container">
      <img
        src={getImageSourceFromName(weather)}
        alt="Unknown Status"
        className="weather-img"
      />
    </div>
  ) : (
    <div className="empty-div">
      <h1>?</h1>
    </div>
  );

  const onStarted = (
    <div className="weather-card">
      <h1 style={{ textAlign: "center", marginTop: "12px" }}>
        How hot is where I am right now?
      </h1>
      <div className="weather-presentation">
        <div className="empty-div">
          <h1>?</h1>
        </div>
      </div>
      <button onClick={clickPosition}>Use my location</button>
    </div>
  );

  const onReady = (
    <div className="weather-card">
      <div className="weather-info">
        <p className="weather-location">{location}</p>
        <p className="weather-date">{props.date}</p>
        <p className="weather-type">{weather || "Unknown weather"}</p>
      </div>
      <div className="weather-presentation">
        {iconOrQuestion}
        <p className="weather-temperature">
          {temperatureString || "Unknown temperature"}
        </p>
      </div>
      <button onClick={clickPosition}>Use my location</button>
    </div>
  );

  const onWaiting = (
    <div className="weather-card weather-loading">
      <div className="loader">Loading...</div>
    </div>
  );

  const onError = (
    <div className="weather-card weather-wrong">
      <p className="weather-wrong">Something went wrong...</p>
      <button onClick={clickPosition}>Try Again</button>
    </div>
  );

  return currentStatus === Status.UNSTARTED
    ? onStarted
    : currentStatus === Status.READY
    ? onReady
    : currentStatus === Status.LOADING
    ? onWaiting
    : onError;
};

export default WeatherCard;
