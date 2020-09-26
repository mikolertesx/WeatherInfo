import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../store/reducer";

const WeatherCard = (props) => {
  const clickPosition = () => {
    navigator.geolocation.getCurrentPosition((geoLocation) => {
      props.onLocationChange({
        lat: geoLocation.coords.latitude,
        long: geoLocation.coords.longitude,
      });
    });
  };
  return (
    <p onClick={clickPosition}>
      {props.location.lat !== null
        ? `${props.location.lat}, ${props.location.long}`
        : "Sin ubicacion."}
    </p>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherCard);
