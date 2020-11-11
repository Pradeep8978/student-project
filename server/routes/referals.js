const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
// const axios = require('axios')
const { validateBody, schemas, validateParams } = require('../helpers/routeHelpers');
const ReferalController = require('../controllers/referals');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const multer = require('multer');
const CircularJSON = require('circular-json');
var os = require("os");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

router.route('/create')
  .post(validateBody(schemas.referalSchema), ReferalController.createReferal);
router.route('/list')
  .get(passportJWT, ReferalController.getReferals);
router.route('/update/:id')
  .put(passportJWT,ReferalController.updateReferal)
  router.route("/delete/:id")
  .delete(passportJWT,ReferalController.deleteReferal)

module.exports = router;