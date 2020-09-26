import {SET_LOCATION, SET_DATE} from './actionTypes';

function setLocation(location) {
  return {
    type: SET_LOCATION,
    loc: {
      lat: location.lat,
      long: location.long,
    }
  }
}

function setDate(date) {
  return {
    type: SET_DATE,
    date: date,
  }
}

export {setLocation, setDate}