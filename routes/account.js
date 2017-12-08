var express = require('express');
var router = express.Router();
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var user = require('../models/user');

// Create the token
function createToken(user) {
  return "Bearer " + jwt.sign(_.omit(user, 'password'), process.env.EJWT, {
    expiresIn: 60*60*5
  });
}

// Log into the app
router.post('/login', function (req, res, next) {
  if (!req.body.user) {
    return res.json({
      "error":{
        "code":400,
        "message":"Username or Email is missing."
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
  user.getUser(req.body.user, function (err, rows) {
    if (err) {
      return res.json(err);
    }
    var userFound = rows[0];
    if (!userFound) {
      return res.json({
        "error":{
          "code":400,
          "message":"User not found."
        }
      });
    }
    bcrypt.compare(req.body.password, userFound.PSS_PASSWORD, function(err, result) {
      if (err) {
        return res.json(err);
      }
      if (!result) {
        return res.json({
          "error":{
            "code":401,
            "message":"Invalid password."
          }
        });
      }
      return res.json({
        "success":{
          "code":201,
          "message":"Correct login.",
          "token": createToken(userFound),
          "user":{
            "id":rows[0].ID_USER,
            "firstname":rows[0].STR_FIRST_NAME,
            "secondname":rows[0].STR_SECOND_NAME,
            "lastname":rows[0].STR_LAST_NAME,
            "username":rows[0].STR_USERNAME,
            "email":rows[0].STR_EMAIL,
            "birthdate":rows[0].DTM_BIRTHDATE,
            "licenseplate":rows[0].STR_LICENSE_PLATE
          }
        }
      });
    });
  });
});

// Sign up into the app
router.post('/signUp', function (req, res, next) {
  if (!req.body.email) {
    return res.json({
      "error":{
        "code":400,
        "message":"Email is missing."
      }
    });
  }
  if (!req.body.username) {
    return res.json({
      "error":{
        "code":400,
        "message":"Username is missing."
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
  if (req.body.password.length < 8) {
    return res.json({
      "error":{
        "code":213,
        "message":"Password length must be 8 or greater."
      }
    })
  }
  user.checkUserByEmail(req.body.email, function (err1, rows1) {
    if (err1) {
      return res.json(err1);
    }
    var newUser = rows1[0].FOUND;
    if (newUser) {
      return res.json({
        "error":{
          "code":400,
          "message":"Email is in use."
        }
      });
    }
    user.checkUserByUsername(req.body.username, function (err2, rows2) {
      if (err2) {
        return res.json(err2);
      }
      newUser = rows2[0].FOUND;
      if (newUser) {
        return res.json({
          "error":{
            "code":400,
            "message":"Username is in use."
          }
        });
      }
      newUser = req.body;
      bcrypt.hash(newUser.password, 11, function (err3, hash) {
        if (err3) {
          return res.json(err3);
        }
        newUser.password = hash;
        user.addUser(newUser, function (err4, result) {
          if (err4) {
            return res.json(err4);
          }
          return res.json({
            "success":{
              "code":201,
              "message":"User created successfully."
            }
          });
        });
      });
    });
  });
});

module.exports = router;
