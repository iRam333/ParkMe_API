var express = require('express');
var router = express.Router();

var ejwt = require('express-jwt');
var zone = require('../models/zone');

var jwtCheck = ejwt({
  secret: process.env.EJWT
});

/*GET*/
router.get('/:id?', jwtCheck, function (req, res, next) {
  zone.getAllZonesByEstablishment(req.params.id, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

/*POST*/
router.post('/', jwtCheck, function (req, res, next) {
  zone.addZone(req.body, function (err, count) {
    if (err) {
      res.json(err);
    }
    else {
      res.status(201).send('Zona creada sin problema');
    }
  });
});

module.exports = router;
