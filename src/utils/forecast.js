//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("postman-request");

//weatherstack key
//ef90f7307a5e224750d405152954caeb

const getForecast = (lat, long, callback) => {
  const weatherURL =
    "http://api.weatherstack.com/current?access_key=ef90f7307a5e224750d405152954caeb&query=" +
    lat +
    "," +
    long +
    "&units=m";
  request({ url: weatherURL, json: true }, (err, response) => {
    if (err) {
      callback("Failed to connect to Weather Stack", undefined);
    } else if (response.body.error) {
      callback("unable to find location", undefined);
    } else {
      const current = response.body.current;
      callback(undefined, {
        desc: current.weather_descriptions[0],
        currentTemp: current.temperature,
        feelsLikeTemp: current.feelslike,
        humidity: current.humidity,
      });
    }
  });
};

module.exports = getForecast;
