var db = require('../dbconnection');

var parkingBay = {
  updateParkingBay:function(parkingBay, callback) {
    return db.query("UPDATE PARKING_BAY SET NUM_STATUS = ? WHERE NUM_LATITUDE = ? AND NUM_LONGITUDE = ?", [parkingBay.status, parkingBay.latitude, parkingBay.longitude], callback);
  }
};

module.exports = parkingBay;
