const router = require('express-promise-router')();
// const axios = require('axios')
var path = require('path')
const multer = require('multer');
const uploadController = require('./../controllers/uploads')
// SET STORAGE
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({ storage: storage });

router.post('/upload',upload.single('file'),function(req, res, next) {
  console.log(req.file);
  if(!req.file) {
    res.status(500);
    return next();
  }
  res.json({ fileUrl: req.get('host') + "/" + req.file.path});
})


router.route('/create')
  .post(passportJWT, uploadController.createUpload);
router.route('/list')
  .get(passportJWT,uploadController.getUpload);


// router.route('/image/upload')
//   .post(upload.single('resume'), (req, res, next) => {
//     const file = req.file;
//     console.log('REEQ BODY =>', req.body.origin)
//     if (!file) {
//       const error = new Error('Please upload a file');
//       error.httpStatusCode = 400
//       return next(error);
//     }
//     const file_location = `${req.body.origin}/${file.destination}/${file.filename}`
//       res.send(file_location);
//   });

module.exports = router;