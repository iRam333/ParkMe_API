var express = require('express');
var router = express.Router();
var parkingLot = require('../models/parkingBay');

// Update a parking lot
router.put('/', function (req, res, next) {
  parkingLot.updateParkingBay(req.body, function (err, rows) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      "success":{
        "code":201,
        "message":"Parking Bay updated successfully."
      }
    });
  });
});

module.exports = router;
