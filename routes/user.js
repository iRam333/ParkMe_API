var express = require('express');
var router = express.Router();
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');
var bcrypt = require('bcrypt');
var user = require('../models/user');

var jwtCheck = ejwt({
  secret: process.env.EJWT
});

function createToken(user) {
  return "Bearer " + jwt.sign(_.omit(user, 'password'), process.env.EJWT, {
    expiresIn: 60*60*5
  });
}

/*GET*/
router.get('/checkUsername/:username?', jwtCheck, function (req, res, next) {
  if (!req.params.username) {
    return res.json({"error":{"code":400, "message":"Username is missing."}});
  }
  user.getUsername(req.params.username, function (err, rows) {
    if (err) {
      res.json(err);
    }
    var usernameFound = rows[0].FOUND
    if (!usernameFound) {
        res.json({"error":{"code":210, "message":"The username is available."}});
    }
    else {
      res.json({"success":{"code":211, "message":"The username is already in use."}});
    }
  });
});

router.get('/checkEmail/:email?', jwtCheck, function (req, res, next) {
  if (!req.params.email) {
    return res.json({"error":{"code":400, "message":"Email is missing."}});
  }
  user.getEmail(req.params.email, function (err, rows) {
    if (err) {
      res.json(err);
    }
    var emailFound = rows[0].FOUND
    if (!emailFound) {
        res.json({"error":{"code":210, "message":"The email is available."}});
    }
    else {
      res.json({"success":{"code":211, "message":"The email is already in use."}});
    }
  });
});

router.get('/verifyByUsername/:username?', jwtCheck, function (req, res, next) {
  if (!req.params.username) {
    return res.json({"error":{"code":400, "message":"Username is missing."}});
  }
  user.getUserByUsername(req.params.username, function (err, rows) {
    if (err) {
      res.json({"error":{"code":404, "message":"User not found."}});
    }
    var userFound = rows[0];
    res.json(userFound);
  });
});

router.get('/verifyByEmail/:email?', jwtCheck, function (req, res, next) {
  if (!req.params.email) {
    return res.json({"error":{"code":400, "message":"Email is missing."}});
  }
  user.getUserByEmail(req.params.email, function (err, rows) {
    if (err) {
      res.json({"error":{"code":404, "message":"User not found."}});
    }
    var userFound = rows[0];
    res.json(userFound);
  });
});

/*POST*/
router.post('/signUp', function (req, res, next) {
  if (!req.body.email) {
    return res.json({"error":{"code":400, "message":"Email is missing."}});
  }
  if (!req.body.username) {
    return res.json({"error":{"code":400, "message":"Username is missing."}});
  }
  if (!req.body.password) {
    return res.json({"error":{"code":400, "message":"Password is missing."}});
  }
  user.getEmail(req.body.email, function (err, rows1) {
    if (err) {
      res.json(err);
    }
    var newUser = rows1[0].FOUND;
    if (!newUser) {
      user.getUsername(req.body.username, function (err, rows2) {
        if (err) {
          res.json(err);
        }
        newUser = rows2[0].FOUND;
        if (!newUser) {
          newUser = req.body;
          bcrypt.hash(newUser.password, 11, function (err, hash) {
            if (err) {
              res.json(err);
            }
            newUser.password = hash;
            user.addUser(newUser, function (err, result) {
              if (err) {
                res.json(err);
              }
              return res.json({"success":{"code":201, "message":"User created successfully."}});
            });
          });
        }
        else {
          res.json({"error":{"code":400, "message":"Username is in use."}});
        }
      });
    }
    else {
      res.json({"error":{"code":400, "message":"Email is in use."}});
    }
  });
});

router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send('Debe ingresar el usuario y la contraseña');
  }
  user.getUser(req.body.username, function (err, rows) {
    if (err) {
      res.json(err);
    }
    console.log(rows);
    var userFound = rows[0];
    if (!userFound) {
      return res.status(404).send('El usuario no existe');
    }
    bcrypt.compare(req.body.password, userFound.PSS_PASSWORD, function(err, result) {
      if (err) {
        res.json(err);
      }
      if (!result) {
        return res.status(401).send("Usuario o contraseña incorrectos");
      }
      else {
        res.status(201).send({"success":{"token": createToken(userFound)}});
      }
    });
  });
});

module.exports = router;
