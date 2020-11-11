const router = require('express-promise-router')();
// const axios = require('axios')
const multer = require('multer');
// SET STORAGE
// var storage = multer.diskStorage({

//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  
//   }
// });

// const upload = multer({ storage: storage });
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});
router.post('/upload',upload.single('file'),function(req, res, next) {
  console.log(req.file);
  if(!req.file) {
    res.status(500);
    return next();
  }
  res.json({ fileUrl: 'http://192.168.0.7:3000/images/' + req.file.filename });
})

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