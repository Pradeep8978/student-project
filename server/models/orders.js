const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const orderSchema = new Schema({
//   customerId: String,
//   products: [
//     {
//       _id: String,
//       quantity: Number,
//       price: Number,
//       requirements: []
//     }
//   ],
//   address: {
//     name: String,
//     phone: Number,
//     secondaryPhone: Number,
//     address_line_1: String,
//     address_line_2: String,
//     landmark: String,
//     city: String,
//     state: String,
//     pincode: Number
//   },
//   tracking: Array,
//   transactionId: String,
//   isCod: Boolean,
//   status: String,
//   orderedOn: String,
//   totalPrice: Number
// });

// Create a schema
const orderSchema = new Schema({
  customerId: String,
  productId: String,
  quantity: Number,
  amount: Number,
  orderedOn: String,
  product_id: String,
  Tracking: [],
  TransactionId: String,
  isCod: Boolean,
  status: String,
  cancelledOn: String,
  cancelledBy: String,
  address: {
    name: String,
    phone: Number,
    secondaryPhone: Number,
    address_line_1: String,
    address_line_2: String,
    landmark: String,
    city: String,
    state: String,
    pincode: Number
  }
});
// Create a model
const Orders = mongoose.model("orders", orderSchema, "orders");

// Export the model
module.exports = Orders;
