const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create a schema
const feedbackSchema = new Schema({
    message : String,
    customer:{ type: Schema.Types.ObjectId, ref: "users" }
});
// Create a model
const Feedback = mongoose.model('feedback', feedbackSchema,'feedback');

// Export the model
module.exports = Feedback;