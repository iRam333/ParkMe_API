var db = require('../dbconnection');

var parkingBay = {
  updateParkingBay:function(parkingBay, callback) {
    db.query("SELECT ID_PARKING_BAY FROM PARKING_BAY WHERE NUM_LATITUDE = 3.349227 AND NUM_LONGITUDE = -76.531410", [parseFloat(parkingBay.latitude), parseFloat(parkingBay.longitude)], function (err, rows) {
      if (err) {
        return res.json(err);
      }
      return db.query("UPDATE PARKING_BAY SET NUM_STATUS = ? WHERE ID_PARKING_BAY = ?", [parkingBay.status, rows[0].ID_PARKING_BAY], callback);
    });
  }
};

module.exports = parkingBay;
