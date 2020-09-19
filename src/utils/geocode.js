const request = require("postman-request");

//mapbox key
//pk.eyJ1IjoiaGFua3lhZCIsImEiOiJja2Y1eGNnY24wcm5pMnlub25wNTFkNnNtIn0.b_bqEk_ddllftcJgzD-d6A

const geocode = (location, callback) => {
  const mapboxURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(location) +
    ".json?access_token=pk.eyJ1IjoiaGFua3lhZCIsImEiOiJja2Y1eGNnY24wcm5pMnlub25wNTFkNnNtIn0.b_bqEk_ddllftcJgzD-d6A&limit=1";

  request({ url: mapboxURL, json: true }, (err, response) => {
    if (err) {
      callback("Unable to connect to mapbox API", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else if (response.body.features.length > 0) {
      callback(undefined, {
        lat: response.body.features[0].center[1],
        long: response.body.features[0].center[0],
        placeName: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
