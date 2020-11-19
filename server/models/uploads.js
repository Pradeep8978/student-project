const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create a schema
const uploadSchema = new Schema({
    name : String,
    fileUrl: String,
    location: String,
    category: String,
    failures: {
        type: Number,
        default: 0
    },
    customer:{ type: Schema.Types.ObjectId, ref: "users" }

});
// Create a model
const Upload = mongoose.model('upload', uploadSchema,'upload');

// Export the model
module.exports = Upload;