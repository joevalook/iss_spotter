const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json')
}

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body);
  ip = (ip['ip'])
  return request(`https://freegeoip.app/json/${ip}`)
};

const fetchISSFlyOverTimes = function(body) {
  let coords = JSON.parse(body);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  return request(url)
}

const nextISSTimesForMyLocation = function(){
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => {
    let times = JSON.parse(body).response;
    return (times)
  })
}

module.exports = { nextISSTimesForMyLocation };