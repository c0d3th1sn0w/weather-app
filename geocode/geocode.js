const request = require('request');

const geocodeFetchAddress = (addressString, callback) => {

  // Encode the address to URI formatted_address
  const userAddressURIFormat = encodeURIComponent(addressString);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddressURIFormat}&key=AIzaSyAFVNjFpSR5PsPyBF_ZyPKqG8vyNkx6fxQ`,
    json: true
  }, (error, response, body) => {      // CALLBACK FUNCTION
    // console.log(JSON.stringify(body, undefined, 2));
    if(error) {
      callback('Unable to connect to Google server, for address lookup.');

    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find the address.');

    } else if(body.status === 'OK') {
      callback(undefined, {
        address: `${body.results[0].formatted_address}`,
        lattitude: `${body.results[0].geometry.location.lat}`,
        longitude: `${body.results[0].geometry.location.lng}`
      });
    } else {
      callback(`Received the following error from Google server:\n${body.error_message}`)
    }
  });
};

// API KEY: 07182d2d65f5864fc0544992b393b301
// https://api.darksky.net/forecast/07182d2d65f5864fc0544992b393b301/43.6617087,-79.3815764

module.exports.geocodeFetchAddress = geocodeFetchAddress;
