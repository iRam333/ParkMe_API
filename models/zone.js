var db = require('../dbconnection');

var zone = {
  getAllZonesByEstablishment:function (id, callback) {
    return db.query("SELECT * FROM ZONE WHERE FK_ID_ESTABLISHMENT = ?", [id], callback);
  },
  addZone:function (data, callback) {
    return db.query("INSERT INTO ZONE (STR_ZONE_NAME, FK_ID_ESTABLISHMENT) VALUES (?, ?)", [data.name, data.establishment], callback);
  }
};

module.exports = zone
