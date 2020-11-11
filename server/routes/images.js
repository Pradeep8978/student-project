
const router = require('express-promise-router')();
const Multer = require('multer');
const path = require("path");
const {Storage} = require('@google-cloud/storage');
const {format} = require('util');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });
  
const storage = new Storage({
    keyFilename: path.join(__dirname, "../../credentials.json"),
    projectId: "ramustocks-270809"
})

  // A bucket is a container for objects (files).
  const bucket = storage.bucket('ramustocks-images');
  

router.route('/upload')
  .post(multer.single('image'), (req, res, next) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
      }
      const fileName = req.body.fileName || `${new Date().getTime()}-${req.file.originalname}`;
      // Create a new blob in the bucket and upload the file data.
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream();
    
      blobStream.on('error', err => {
        next(err);
      });
    
      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        res.status(200).send(publicUrl);
      });
    
      blobStream.end(req.file.buffer);
    });

  module.exports = router;