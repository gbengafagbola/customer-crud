const express = require('express');
const app = express();
const customerRoute = express.Router();

let Customer = require('../model/Customer');

// Add Customer
customerRoute.route('/add-customer').post((req, res, next) => {
  Customer.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all customer
customerRoute.route('/').get((req, res) => {
  Customer.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single customer
customerRoute.route('/read-customer/:id').get((req, res) => {
  Customer.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update customer
customerRoute.route('/update-customer/:id').put((req, res, next) => {
  Customer.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Customer successfully updated!')
    }
  })
})

// Delete customer
customerRoute.route('/delete-customer/:id').delete((req, res, next) => {
  Customer.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = customerRoute;