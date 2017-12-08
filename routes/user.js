var express = require('express');
var router = express.Router();
var ejwt = require('express-jwt');
var bcrypt = require('bcrypt');
var user = require('../models/user');

// Check JWT
var jwtCheck = ejwt({
  secret: process.env.EJWT
});

// Check if username is available
router.get('/checkUsername/:username?', jwtCheck, function (req, res, next) {
  if (!req.params.username) {
    return res.json({
      "error":{
        "code":400,
        "message":"Username is missing."
      }
    });
  }
  user.checkUserByUsername(req.params.username, function (err, rows) {
    if (err) {
      return res.json(err);
    }
    var usernameFound = rows[0].FOUND
    if (!usernameFound) {
      return res.json({
        "error":{
          "code":210,
          "message":"The username is available."
        }
      });
    }
    return res.json({
      "success":{
        "code":211,
        "message":"The username is already in use."
      }
    });
  });
});

// Check if email is available
router.get('/checkEmail/:email?', jwtCheck, function (req, res, next) {
  if (!req.params.email) {
    return res.json({
      "error":{
        "code":400,
        "message":"Email is missing."
      }
    });
  }
  user.checkUserByEmail(req.params.email, function (err, rows) {
    if (err) {
      return res.json(err);
    }
    var emailFound = rows[0].FOUND
    if (!emailFound) {
      return res.json({
        "error":{
          "code":210,
          "message":"The email is available."
        }
      });
    }
    return res.json({
      "success":{
        "code":211,
        "message":"The email is already in use."
      }
    });
  });
});

// Update user information
router.put('/information/:id?', jwtCheck, function (req, res, next) {
  if (!req.body.password) {
    return res.json({
      "error":{
        "code":400,
        "message":"Password is missing."
      }
    });
  }
  if (!req.body.firstname) {
    return res.json({
      "error":{
        "code":400,
        "message":"Firstname is missing."
      }
    });
  }
  if (!req.body.lastname) {
    return res.json({
      "error":{
        "code":400,
        "message":"Last name is missing."
      }
    });
  }
  if (!req.body.birthdate) {
    return res.json({
      "error":{
        "code":400,
        "message":"Birthdate is missing."
      }
    });
  }
  if (!req.body.licenseplate) {
    return res.json({
      "error":{
        "code":400,
        "message":"License plate is missing."
      }
    });
  }
  user.getUserPasswordById(req.params.id, function (err1, rows1) {
    if (err1) {
      return res.json(err);
    }
    bcrypt.compare(req.body.password, rows1[0].PSS_PASSWORD, function(err2, rows2) {
      if (err2) {
        return res.json(err2);
      }
      if (!rows2) {
        return res.json({
          "error":{
            "code":401,
            "message":"Invalid password."
          }
        });
      }
      user.updateUserInfo(req.params.id, req.body, function (err3, rows3) {
        if (err3) {
          return res.json(err3);
        }
        return res.json({
          "success":{
            "code":201,
            "message":"User updated successfully."
          }
        });
      });
    });
  });
});

// Update user email
router.put('/email/:id?', jwtCheck, function (req, res, next) {
  if (!req.body.email) {
    return res.json({
      "error":{
        "code":400,
        "message":"Email is missing."
      }
    });
  }
  if (!req.body.password) {
    return res.json({
      "error":{
        "code":400,
        "message":"Password is missing."
      }
    });
  }
  user.getUserPasswordById(req.params.id, function (err1, rows1) {
    if (err1) {
      return res.json(err);
    }
    bcrypt.compare(req.body.password, rows1[0].PSS_PASSWORD, function(err2, rows2) {
      if (err2) {
        return res.json(err2);
      }
      if (!rows2) {
        return res.json({
          "error":{
            "code":401,
            "message":"Invalid password."
          }
        });
      }
      user.updateUserEmail(req.params.id, req.body, function (err3, rows3) {
        if (err3) {
          return res.json(err3);
        }
        return res.json({
          "success":{
            "code":201,
            "message":"Email updated successfully."
          }
        });
      });
    });
  });
});

// Update user username
router.put('/username/:id?', jwtCheck, function (req, res, next) {
  if (!req.body.email) {
    return res.json({
      "error":{
        "code":400,
        "message":"Email is missing."
      }
    });
  }
  if (!req.body.password) {
    return res.json({
      "error":{
        "code":400,
        "message":"Password is missing."
      }
    });
  }
  user.getUserPasswordById(req.params.id, function (err1, rows1) {
    if (err1) {
      return res.json(err);
    }
    bcrypt.compare(req.body.password, rows1[0].PSS_PASSWORD, function(err2, rows2) {
      if (err2) {
        return res.json(err2);
      }
      if (!rows2) {
        return res.json({
          "error":{
            "code":401,
            "message":"Invalid password."
          }
        });
      }
      user.updateUserUsername(req.params.id, req.body, function (err3, rows3) {
        if (err3) {
          return res.json(err3);
        }
        return res.json({
          "success":{
            "code":201,
            "message":"Username updated successfully."
          }
        });
      });
    });
  });
});

// Update user password
router.put('/password/:id?', jwtCheck, function (req, res, next) {
  if (!req.body.oldpassword1 || !req.body.oldpassword2) {
    return res.json({
      "error":{
        "code":400,
        "message":"Password is missing."
      }
    });
  }
  if (req.body.oldpassword1 != req.body.oldpassword2) {
    return res.json({
      "error":{
        "code":212,
        "message":"Passwords do not match."
      }
    });
  }
  if (req.body.newpassword.length < 8) {
    return res.json({
      "error":{
        "code":213,
        "message":"Password length must be 8 or greater."
      }
    });
  }
  user.getUserPasswordById(req.params.id, function (err1, rows1) {
    if (err1) {
      return res.json(err);
    }
    bcrypt.compare(req.body.oldpassword1, rows1[0].PSS_PASSWORD, function(err2, result) {
      if (err2) {
        return res.json(err2);
      }
      if (!result) {
        return res.json({
          "error":{
            "code":401,
            "message":"Invalid password."
          }
        });
      }
      bcrypt.hash(req.body.newpassword, 11, function (err3, hash) {
        if (err3) {
          return res.json(err3);
        }
        req.body.newpassword = hash;
        user.updateUserPassword(req.params.id, req.body, function (err4, rows2) {
          if (err4) {
            return res.json(err4);
          }
          return res.json({
            "success":{
              "code":201,
              "message":"Password updated successfully."
            }
          });
        });
      });
    });
  });
});

module.exports = router;
