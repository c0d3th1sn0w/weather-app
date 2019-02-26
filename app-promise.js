const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options({
  a: {
    demand: true,  // mandatory
    string: true,  // data type
    alias: 'address',
    describe: 'Address to fetch weather for'
  }
})
.help()
.alias('help','h')
.argv;

// Function to convert temperature reading (and round it to whole number)
var convertTempToC = (tempInF) => {
  if(typeof tempInF === 'number' ) {
    return Number(((5/9) * (tempInF - 32)).toFixed(0));
  } else {
    return '<Invalid temperature value received.>'
  }
};

var userAddressURIFormat = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddressURIFormat}&key=AIzaSyAFVNjFpSR5PsPyBF_ZyPKqG8vyNkx6fxQ`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
  console.log(response.data.results[0].formatted_address);

  const lat = response.data.results[0].geometry.location.lat;
  const lng = response.data.results[0].geometry.location.lng;
  // Get the weather weather data here
  var weatherUrl = `https://api.darksky.net/forecast/07182d2d65f5864fc0544992b393b301/${lat},${lng}`;
  return axios.get(weatherUrl);

}).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to fetch weather details for this address.');
  }
  // All Done //
  console.log('Current Temp : ',convertTempToC(response.data.currently.temperature),' °C');
  console.log('Feels-like   : ',convertTempToC(response.data.currently.apparentTemperature),' °C');
}).catch((e) => {
  if(e.code === 'ENOTFOUND') {
    console.log('Unable to connect to the API servers.');
  } else {
    console.log(e.message);
  }
});
