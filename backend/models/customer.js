const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Customer = new Schema({
  CustomerId: {
    type: Number
  },
  Name: {
    type: String
  },
  Gender: {
    type: Boolean
  },
  Age: {
    type: Date
  },
  Address: [{
    street: String,
    postalCode: String,
    HouseNumber: Number
  }],
  Order: {
    OrderId: String,
    OrderDate: Date,
    Amount: Number
  }

}, {
  collection: 'customers'
})

module.exports = mongoose.model('Customer', Customer)