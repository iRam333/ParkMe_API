var express = require('express');
var router = express.Router();
var ejwt = require('express-jwt');
var establishment = require('../models/establishment');

var jwtCheck = ejwt({
  secret: process.env.EJWT
});

// Get all establishments or just one by its ID
router.get('/:id?', jwtCheck, function (req, res, next) {
  if (req.params.id) {
    establishment.getEstablishmentById(req.params.id, function (err, rows) {
      if (err) {
        return res.json(err);
      }
      return res.json({
        "success":{
          "code":201,
          "establishment":{
            "id":rows[0].ID_ESTABLISHMENT,
            "name":rows[0].STR_BUSINESS_NAME,
            "country":rows[0].STR_COUNTRY,
            "city":rows[0].STR_CITY,
            "address":rows[0].STR_ADDRESS
          }
        }
      });
    });
  }
  else {
    establishment.getAllEstablishment (function(err, rows) {
      if (err) {
        return res.json(err);
      }
      var establishments = {
        "success":{
          "code":201,
          "establishments":{}
        }
      };
      var establishment
      for (var i = 0; i < rows.length; i++) {
        establishment = {
          "id":rows[i].ID_ESTABLISHMENT,
          "name":rows[i].STR_BUSINESS_NAME,
          "country":rows[i].STR_COUNTRY,
          "city":rows[i].STR_CITY,
          "address":rows[i].STR_ADDRESS
        }
        establishments.success.establishments["establishment"+(i+1)] = establishment;
      }
      return res.json(establishments);
    });
  }
});

// Create an establishment
router.post('/', jwtCheck, function (req, res, next) {
  establishment.addEstablishment(req.body, function (err, count) {
    if (err) {
      res.json(err);
    }
    return res.json({
      "success":{
        "code":201,
        "message":"Establishment created successfully."
      }
    });
  });
});

// Delete an establishment
router.delete('/:id?', jwtCheck, function (req, res, next) {
  if (!req.params.id) {
    return res.json({
      "error":{
        "code":400,
        "message":"Establishment ID is missing."
      }
    });
  }
  establishment.deleteEstablishment(req.params.id, function (err, count) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      "success":{
        "code":201,
        "message":"Establishment deleted successfully."
      }
    });
  });
});

// Update establishment information
router.put('/:id?', jwtCheck, function (req, res, next) {
  if (!req.params.id) {
    return res.json({
      "error":{
        "code":400,
        "message":"Establishment ID is missing."
      }
    });
  }
  establishment.updateEstablishment(req.params.id, req.body, function (err, rows) {
    if (err) {
      res.json(err);
    }
    return res.json({
      "success":{
        "code":201,
        "message":"Establishment updated successfully."
      }
    });
  });
});

module.exports = router;
