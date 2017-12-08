var db = require('../dbconnection');

var parkingLot = {
  getAllParkingLotByEstablishment:function (id, callback) {
    return db.query("SELECT * FROM PARKING_LOT WHERE FK_ID_ESTABLISHMENT = ?", [id], callback);
  },
  addZone:function (data, callback) {
    return db.query("INSERT INTO PARKING_LOT (STR_LOT_NAME, FK_ID_ESTABLISHMENT) VALUES (?, ?)", [data.name, data.establishment], callback);
  },
  deleteParkingLot:function(id, callback) {
    return db.query("DELETE FROM PARKING_LOT WHERE ID_PARKING_LOT = ?", [id], callback);
  },
  updateParkingLot:function(id, parkingLot, callback) {
    return db.query("UPDATE PARKING_LOT SET STR_LOT_NAME = ? WHERE ID_PARKING_LOT = ?", [parkingLot.name, id], callback);
  }
};

module.exports = parkingLot
