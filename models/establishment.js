var db = require('../dbconnection');

var establishment = {
  getAllEstablishment:function(callback) {
    return db.query("SELECT * FROM ESTABLISHMENT", callback);
  },
  getEstablishmentById:function(id, callback) {
    return db.query("SELECT * FROM ESTABLISHMENT WHERE ID_ESTABLISHMENT = ?", [id], callback);
  },
  addEstablishment:function(establishment, callback) {
    return db.query("INSERT INTO ESTABLISHMENT (STR_BUSINESS_NAME, STR_COUNTRY, STR_CITY, STR_ADDRESS) VALUES (?, ?, ?, ?)", [establishment.name, establishment.country, establishment.city, establishment.address], callback);
  },
  deleteEstablishment:function(id, callback) {
    return db.query("DELETE FROM ESTABLISHMENT WHERE ID_ESTABLISHMENT = ?", [id], callback);
  },
  updateEstablishment:function(id, establishment, callback) {
    return db.query("UPDATE ESTABLISHMENT SET STR_BUSINESS_NAME = ?, STR_COUNTRY = ?, STR_CITY = ?, STR_ADDRESS = ? WHERE ID_ESTABLISHMENT = ?", [establishment.name, establishment.country, establishment.city, establishment.address, id], callback);
  }
};

module.exports = establishment;
