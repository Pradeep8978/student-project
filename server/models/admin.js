const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const adminSchema = new Schema({
    phone: Number,
    name: String,
    email: String,
    password: String,
    pictureUrl: String,
    dob: String,
    address: {
      address_line1: String,
      address_line2: String,
      city: String,
      state: String,
      pinCode: Number
    }
});



adminSchema.pre('save', async function (next) {

  try {
    const admin = this;
    //check if the admin has been modified to know if the password has already been hashed
    if (!admin.isModified('password')) {
      next();
    }
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    console.log('Password =>', this.password)
    this.password = await bcrypt.hash(this.password, salt);
    console.log('exited');
    next();
  } catch (error) {
    next(error);
  }
  
});
adminSchema.pre('findOneAndUpdate', function (next) {
  this._update.password = bcrypt.hashSync(this._update.password, 10)
next();
})

adminSchema.methods.isValidPassword = async function (newPassword) {
  console.log(newPassword, this.password);
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
}


// Create a model
const Admin = mongoose.model('admin', adminSchema);

// Export the model
module.exports = Admin;