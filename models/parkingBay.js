var db = require('../dbconnection');

var parkingBay = {
  updateParkingBay:function(parkingBay, callback) {
    console.log(parkingBay);
    return db.query("UPDATE PARKING_BAY SET NUM_STATUS = ? WHERE ID_PARKING_BAY = (SELECT ID_PARKING_BAY FROM PARKING_BAY WHERE NUM_LATITUDE = ? AND NUM_LONGITUDE = ?)", [parkingBay.status, parkingBay.latitude, parkingBay.longitude], callback);
  }
};

module.exports = parkingBay;
