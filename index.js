const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log(error);
//     return;
//   } else {
//     console.log(ip);
//   }
// });

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
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // successful
  passTimes.map(time => console.log(time));
});