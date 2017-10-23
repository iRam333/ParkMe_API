var express = require('express');
var router = express.Router();

var ejwt = require('express-jwt');
var establishment = require('../models/establishment');

var jwtCheck = ejwt({
  secret: process.env.EJWT
});

/*GET*/
router.get('/:id?', jwtCheck, function (req, res, next) {
  if (req.params.id) {
    establishment.getEstablishmentById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
  else {
    establishment.getAllEstablishment (function(err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
});

/*POST*/
router.post('/', jwtCheck, function (req, res, next) {
  establishment.addEstablishment(req.body, function (err, count) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(req.body);
    }
  });
});

/*DELETE*/
router.delete('/:id?', jwtCheck, function (req, res, next) {
  establishment.deleteEstablishment(req.params.id, function (err, count) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(count);
    }
  });
});

/*PUT*/
router.put('/:id?', jwtCheck, function (req, res, next) {
  establishment.updateEstablishment(req.params.id, req.body, function (err, rows) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
