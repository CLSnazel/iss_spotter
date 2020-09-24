const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss2');



// fetchCoordsByIP('50.92.116.235', (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data);
//   }
// });

// //{ latitude: '49.11970', longitude: '-122.90560' }
// fetchISSFlyOverTimes({ latitude: '49.11970', longitude: '-122.90560' }, (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data);
//   }
// });
nextISSTimesForMyLocation();