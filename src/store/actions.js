import {SET_LOCATION} from './actionTypes';

function setLocation(location) {
  return {
    type: SET_LOCATION,
    loc: {
      lat: location.lat,
      long: location.long,
    }
  }
}

export {setLocation}