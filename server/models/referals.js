const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create a schema
const referalSchema = new Schema({ 
    name: String,
    phone: Number,
    email: String,
    message: String,
    referalId: String,
    converted: Boolean,
    interested: String,
    createdOn : String,
    modifiedOn : String
});
// Create a model
const Product = mongoose.model('referals', referalSchema,'referals');

// Export the model
module.exports = Product;