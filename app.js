const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

var latAddress;
var longAddress;

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

geocode.geocodeFetchAddress(argv.address, (errorMessage, result) => {
  if(errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(`Address: ${result.address}`);

    // fetch weather
    weather.getWeather(result.lattitude,result.longitude, (errorMessage, weatherResults) => {
      if(errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`Current Temp: ${weatherResults.temperature} °C`);
        console.log(`Feels-like  : ${weatherResults.apparentTemperature} °C`);
      }
    });
  }
});
