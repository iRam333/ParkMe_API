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
  return 'Bearer ' + jwt.sign(_.omit(user, 'password'), process.env.EJWT, {
    expiresIn: 60*60*5
  });
}

/*GET*/
router.get('/check/:username?', function (req, res, next) {
  if (!req.params.username) {
    return res.status(400).send('Debe ingresar el usuario');
  }
  user.getUser(req.params.username, function (err, rows) {
    if (err) {
      res.json(err);
    }
    var userFound = rows[0];
    if (!userFound) {
      res.status(200).send('El usuario está disponible');
    }
    else {
      res.status(200).send('El usuario está registrado');
    }
  });
});

router.get('/verify/:username?', jwtCheck, function (req, res, next) {
  if (!req.params.username) {
    return res.status(400).send('Debe ingresar el usuario');
  }
  user.getUser(req.params.username, function (err, rows) {
    if (err) {
      res.status(404).send('Usuario no encontrado');
    }
    var userFound = rows[0];
    res.json(userFound);
  });
});

/*POST*/
router.post('/create', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send('Debe ingresar el usuario y la contraseña');
  }
  user.getUser(req.body.username, function (err, rows) {
    if (err) {
      res.json(err);
    }
    var newUser = rows[0];
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
          res.status(201).send('Usuario creado con exito');
        });
      });
    }
    else {
      res.status(400).send('El usuario ya existe');
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
        res.status(201).send({
          id_token: createToken(userFound)
        });
      }
    });
  });
});

module.exports = router;
