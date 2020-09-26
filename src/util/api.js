import Axios from 'axios';

const baseUrl = 'https://www.metaweather.com/api';
// let currentLocation = null;

const composeUrl = (base, ext) => {
  return `${base}/${ext}`;
}

const getLocation = async (latt, long) => {
  const composedUrl = composeUrl(baseUrl, `location/search/?lattlong=${latt},${long}`);

  const location = await Axios.get(composedUrl);
  console.log(location);

  // Closest place by distance.
  return location.data[0].woeid;
}

const getLocationData = async(woeid) => {
  const composedUrl = composeUrl(baseUrl, `location/${woeid}`);
  const locationData = await Axios.get(composedUrl);
  return locationData.data;
}

const getLocationDataDay = async(woeid, date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDay();
  const composedUrl = composeUrl(baseUrl, `location/${woeid}/${year}/${month}/${day}`);
  const location = await Axios.get(composedUrl);
  return location.data;
}

export {
  getLocation,
  getLocationData,
  getLocationDataDay,
}