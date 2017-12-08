var express = require('express');
var router = express.Router();
var ejwt = require('express-jwt');
var parkingLot = require('../models/parkingLot');

var jwtCheck = ejwt({
  secret: process.env.EJWT
});

// Get parking lot by its establishment ID
router.get('/:id?', jwtCheck, function (req, res, next) {
  if (!req.params.id) {
    return res.json({
      "error":{
        "code":400,
        "message":"Establishment ID is missing."
      }
    });
  }
  parkingLot.getAllParkingLotByEstablishment(req.params.id, function (err, rows) {
    if (err) {
      return res.json(err);
    }
    var parkingLots = {
      "success":{
        "code":201,
        "parkingLots":{}
      }
    };
    var parkingLot
    for (var i = 0; i < rows.length; i++) {
      parkingLot = {
        "id":rows[i].ID_PARKING_LOT,
        "name":rows[i].STR_LOT_NAME,
        "id_establishment":rows[i].FK_ID_ESTABLISHMENT
      }
      parkingLots.success.parkingLots["parkingLot"+(i+1)] = parkingLot;
    }
    return res.json(parkingLots);
  });
});

// Create a parking lot in an establishment
router.post('/', jwtCheck, function (req, res, next) {
  parkingLot.addZone(req.body, function (err, count) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      "error":{
        "code":201,
        "message":"Parking lot created successfully."
      }
    });
  });
});

// Delete a parking lot
router.delete('/:id?', jwtCheck, function (req, res, next) {
  if (!req.params.id) {
    return res.json({
      "error":{
        "code":400,
        "message":"Parking Lot ID is missing."
      }
    });
  }
  parkingLot.deleteParkingLot(req.params.id, function (err, count) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      "success":{
        "code":201,
        "message":"Parking lot deleted successfully."
      }
    });
  });
});

// Update a parking lot
router.put('/:id?', jwtCheck, function (req, res, next) {
  if (!req.params.id) {
    return res.json({
      "error":{
        "code":400,
        "message":"Parking Lot ID is missing."
      }
    });
  }
  parkingLot.updateParkingLot(req.params.id, req.body, function (err, rows) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      "success":{
        "code":201,
        "message":"Parking lot updated successfully"
      }
    });
  });
});

module.exports = router;
