const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create a schema
const feedbackSchema = new Schema({
    title : String,
    message : String,
    customerId:String,
    feedBackOn:String,    
    customerName:String,
    customerImage:String,

});
// Create a model
const Feedback = mongoose.model('feedback', feedbackSchema,'feedback');

// Export the model
module.exports = Feedback;