var db = require('../dbconnection');

var user = {
  getUser:function (username, callback) {
    return db.query("SELECT * FROM USER WHERE STR_USERNAME = ?", [username], callback);
  },
  getUsername:function (username, callback) {
    return db.query("SELECT COUNT(*) AS FOUND FROM USER WHERE STR_USERNAME = ?", [username], callback);
  },
  getEmail:function (email, callback) {
    return db.query("SELECT COUNT(*) AS FOUND FROM USER WHERE STR_EMAIL = ?", [email], callback);
  },
  getUserByUsername:function (username, callback) {
    return db.query("SELECT STR_FIRST_NAME, STR_SECOND_NAME, STR_LAST_NAME, STR_EMAIL, DTM_BIRTHDATE, STR_LICENSE_PLATE, STR_USERNAME FROM USER WHERE STR_USERNAME = ?", [username], callback);
  },
  getUserByEmail:function (email, callback) {
    return db.query("SELECT STR_FIRST_NAME, STR_SECOND_NAME, STR_LAST_NAME, STR_EMAIL, DTM_BIRTHDATE, STR_LICENSE_PLATE, STR_USERNAME FROM USER WHERE STR_EMAIL = ?", [email], callback);
  },
  addUser:function (user, callback) {
    return db.query("INSERT INTO USER (STR_FIRST_NAME, STR_SECOND_NAME, STR_LAST_NAME, STR_EMAIL, DTM_BIRTHDATE, STR_LICENSE_PLATE, STR_USERNAME, PSS_PASSWORD) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [user.firstname, user.secondname, user.lastname, user.email, user.birthdate, user.licenseplate, user.username, user.password], callback);
  }
}

module.exports = user;
