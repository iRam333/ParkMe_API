var db = require('../dbconnection');

var user = {
  getUser:function (username, callback) {
    return db.query("SELECT * FROM USER WHERE STR_USERNAME = ?", [username], callback);
  },
  addUser:function (user, callback) {
    return db.query("INSERT INTO USER (STR_FIRST_NAME, STR_SECOND_NAME, STR_LAST_NAME, STR_EMAIL, DTM_BIRTHDATE, LICENSE_PLATE, STR_USERNAME, PSS_PASSWORD) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [user.firstname, user.secondname, user.lastname, user.email, user.birthdate, user.licenseplate, user.username, user.password], callback);
  }
}

module.exports = user;
