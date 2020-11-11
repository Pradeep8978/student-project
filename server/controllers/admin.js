const JWT = require('jsonwebtoken');
const Admin = require('../models/admin');
const { JWT_SECRET } = require('../configuration');

const signToken = admin => {
  return JWT.sign({
    iss: 'hostelly',
    sub: admin.id,
    role:"admin",
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password, name, phone } = req.value.body;
    
    // Check if there is a user with the same email
    let foundAdmin = await Admin.findOne({ "email": email });
    if (foundAdmin) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    // Create a new user
    const newAdmin = new Admin({
      email,
      phone,
      name,
      password
    });


    const userObj = await newAdmin.save();

    // Generate the token
    const token = signToken(newAdmin);
    // res.setHeader('Authorization', token);
    console.log("USER OBJECT=>", userObj)
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    console.log("req.user",req.user)
    // Generate token
    console.log('USER SIGN IN =>', req.user)
    const token = signToken(req.user);

    // res.setHeader('Authorization', token);
    res.status(200).json({ token });
  },

  signOut: async (req, res, next) => {
    res.clearCookie('access_token');
    // console.log('I managed to get here!');
    res.json({ success: true });
  },


  checkAuth: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ success: true });
  },

  getAdmins: async (req, res, next) => {
    const findSchema = req.query.role ? {
      'profile.role': { "$in": req.query.role }
    } : {};
    const users = await Admin.find(findSchema)
    res.json(users);
  },

  updateProfile: async (req, res) => {
    const profileObj = req.body || {}
    // if(req.body.phone) updateProfile.phone = req.body.phone
    // if(req.body.name) updateProfile.name = req.body.name
    // if(req.body.email) updateProfile.email = req.body.email
    // if(req.body.password) updateProfile.password = req.body.password
    Admin.findByIdAndUpdate(req.user.id, profileObj, { multi: false }, function (err, response) {
      if (err) res.json({ message: "Error in updating product with id " + req.user.id });
      res.json(response);
    })
    // console.log('UPDATE PROFILE BODY', req.body);
    // console.log('USER INFO =>', req.user);
    // const newProfile = {...req.user.profile, ...req.body}
    // await Admin.update({ _id: req.user._id}, {profile: newProfile});
    // res.send({message: 'success'});
  },

  getProfile: async (req, res) => {
    res.send(req.user);
  }
}