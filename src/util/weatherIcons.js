const weatherIcons = {
  'Snow': 'sn',
  'Sleet': 'sl',
  'Hail': 'h',
  'Thunderstorm':'t',
  'Heavy Rain': 'hr',
  'Light Rain': 'lr',
  'Showers': 's',
  'Heavy Cloud': 'hc',
  'Light Cloud': 'lc',
  'Clear': 'c',
}

const weatherAbbreviations = {};

Object.keys(weatherIcons).forEach((key) => {
  const newKey = weatherIcons[key];
  const newResult = key;
  weatherAbbreviations[newKey] = newResult;
});

export {
  weatherIcons,
  weatherAbbreviations,
};