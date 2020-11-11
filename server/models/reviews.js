const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create a schema
const reviewSchema = new Schema({ 
    rating: Number,
    description: String,
    customerName:String,
    customerImage:String,
    productId:String,
    customerId:String
});
// Create a model
const Review = mongoose.model('review', reviewSchema,'review');

// Export the model
module.exports = Review;