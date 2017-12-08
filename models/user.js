var db = require('../dbconnection');

var user = {
  getUser:function (data, callback) {
    return db.query("SELECT ID_USER, STR_FIRST_NAME, STR_SECOND_NAME, STR_LAST_NAME, STR_EMAIL, DTM_BIRTHDATE, STR_LICENSE_PLATE, STR_USERNAME, PSS_PASSWORD FROM USER WHERE STR_USERNAME = ? OR STR_EMAIL = ?", [data, data], callback);
  },
  addUser:function (user, callback) {
    return db.query("INSERT INTO USER (STR_FIRST_NAME, STR_SECOND_NAME, STR_LAST_NAME, STR_EMAIL, DTM_BIRTHDATE, STR_LICENSE_PLATE, STR_USERNAME, PSS_PASSWORD) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [user.firstname, user.secondname, user.lastname, user.email, user.birthdate, user.licenseplate, user.username, user.password], callback);
  },
  checkUserByUsername:function (username, callback) {
    return db.query("SELECT COUNT(STR_USERNAME) AS FOUND FROM USER WHERE STR_USERNAME = ?", [username], callback);
  },
  checkUserByEmail:function (email, callback) {
    return db.query("SELECT COUNT(STR_EMAIL) AS FOUND FROM USER WHERE STR_EMAIL = ?", [email], callback);
  },
  getUserPasswordById:function (id, callback) {
    return db.query("SELECT PSS_PASSWORD FROM USER WHERE ID_USER = ?", [id], callback);
  },
  updateUserInfo:function (id, user, callback) {
    return db.query("UPDATE USER SET STR_FIRST_NAME = ?, STR_SECOND_NAME = ?, STR_LAST_NAME = ?, DTM_BIRTHDATE = ?, STR_LICENSE_PLATE = ? WHERE ID_USER = ?", [user.firstname, user.secondname, user.lastname, user.birthdate, user.licenseplate, id], callback);
  },
  updateUserEmail:function (id, user, callback) {
    return db.query("UPDATE USER SET STR_EMAIL = ? WHERE ID_USER = ?", [user.email, id], callback);
  },
  updateUserUsername:function (id, user, callback) {
    return db.query("UPDATE USER SET STR_USERNAME = ? WHERE ID_USER = ?", [user.username, id], callback);
  },
  updateUserPassword:function (id, user, callback) {
    return db.query("UPDATE USER SET PSS_PASSWORD = ? WHERE ID_USER = ?", [user.newpassword, id], callback);
  }
}

module.exports = user;
