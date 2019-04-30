const request = require('request');

const darkSkyAPIKey = process.env.DARK_SKY_API_KEY;

const getWeather = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${darkSkyAPIKey}/${lat},${long}`,
    json: true
    }, (error, response, body) => {      // CALLBACK FUNCTION
    if(!error && response.statusCode === 200) {

      const tempInC = Number(((5/9) * (body.currently.temperature - 32)).toFixed(0));
      const tempFeelInC = Number(((5/9) * (body.currently.apparentTemperature - 32)).toFixed(0));

      callback(undefined, {
        temperature: `${tempInC}`,
        apparentTemperature: `${tempFeelInC}`
      });
    } else if(error){
      callback('Unable to connect to the weather server.');

    } else {
      callback('Unable to fetch weather.');
    }
  });
};

module.exports.getWeather = getWeather;
