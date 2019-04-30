# weather-app
A command-line app developed using Javascript (Node.js), which uses Google's Geocode API &amp; for looking up an address and then using the received details to fetch the temperature from the popular Dark Sky public API. 

I have also included a version of the code (app-promise.js), which does the same thing using promises (the async way!).

Usage:

node app.js -a "M5B2H5"

OR (to run the promise version of the code)

node app-promise.js -a "M5B2H5"

// OUTPUT:
Address: Toronto, ON M5B 2H5, Canada
Current Temp: -2 °C
Feels-like  : -6 °C


Temperature in Farenheit ?
------------------------------
If you want the temperature to be displayed in Farenheit (instead of Celsius), change the below lines of code:-

  console.log('Current Temp : ',convertTempToC(response.data.currently.temperature),' °C');
  console.log('Feels-like   : ',convertTempToC(response.data.currently.apparentTemperature),' °C');
  
  with:-
  
  console.log('Current Temp : ',response.data.currently.temperature,' °F');
  console.log('Feels-like   : ',response.data.currently.apparentTemperature,' °F');

Please let me know if you have any questions/queries/suggestion on this small utility.


NOTE: 
This app currently has hardcoded KEYs for the used apis, which are associated with my user. 
If you wish to continue using this app (after forking), then I suggest you register yourself
on Google & Dark Sky API page and generate your own keys and use the same. So that in (possibly
near) future, when I revoke my personal keys to generate new ones, the app should not stop 
working for you. Reach out if you would need any guidance on this.
