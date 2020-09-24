const request = require('request');

//make request to retrieve user's IP
//param: callback to pass error msg
//returns error if any,  and IP addr as String or Null
const fetchMyIP = function(callback) {
  //fetch IP addr from JSON API
  //'https://api.ipify.org?format=json'
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      let errorMsg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(errorMsg), null);
    } else {
      callback(null, JSON.parse(body).ip);
    }
  });
};

//given ip as string, and callback
//return geocoordinates
const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      let geoData = JSON.parse(body);
      if (geoData.status !== 'success') {
        let errorMsg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(errorMsg), null);
      } else {
        callback(null, {latitude:geoData.data.latitude, longitude:geoData.data.longitude});
      }
    }
  });
};

//PARAM : coords: object with lat and long keys with string values
//        callback: to pass back error or array or data
//RETURN: via given callback, error (if any, if not, null). array of objects (if any, if not, null)
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      let errorMsg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(errorMsg), null);
    } else {
      let responseData = JSON.parse(body);
      callback(null, responseData.response);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
    } else {
      fetchCoordsByIP(ip, (error, data) => {
        if (error) {
          callback(error, null);
        } else {
          fetchISSFlyOverTimes(data, (error, issData) => {
            if (error) {
              callback(error, null);
            } else {
              let printData = issData.map(time => {
                let dateString = new Date(time.risetime * 1000);
                return `Next pass at ${dateString.toLocaleString()} for ${time.duration} seconds!`;
              });
              callback(null, printData);
            }
          });
        }
      });
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };