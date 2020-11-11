const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../passport");
// const {signInStrategy} = require('../userPassport');
// const axios = require('axios')
const {
  validateBody,
  schemas,
  validateParams,
} = require("../helpers/routeHelpers");
const UserController = require("../controllers/users");
const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
const multer = require("multer");
var os = require("os");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .route("/signup")
  .post(validateBody(schemas.authSchema), UserController.signUp);

router
  .route("/signin")
  .post(
    validateBody(schemas.loginSchema),
    passportSignIn,
    UserController.signIn
  );

router
  .route("/create/employee")
  .post(
    passportJWT,
    validateBody(schemas.authSchema),
    UserController.createEmployee
  );

router.route("/list").get(UserController.getUsers);

router
  .route("/profile/update")
  .put(
    passportJWT,
    UserController.updateProfile
  );

router
  .route("/profile/address/new")
  .post(
    passportJWT,
    validateBody(schemas.userAddress),
    UserController.addNewAddress
  );
router
  .route("/profile/address/update/:addressId")
  .put(
    passportJWT,
    validateBody(schemas.userAddress),
    UserController.updateAddress
  );

router
  .route("/profile/address/delete/:addressId")
  .delete(passportJWT, UserController.removeAddress);

router.route("/profile").get(passportJWT, UserController.getProfile);

router.route("/status").get(passportJWT, UserController.checkAuth);

router.route("/delete/:id").delete(passportJWT, UserController.deleteUser);

router.route("/otp/generate").post(validateBody(schemas.otpGenerate), UserController.otpGenerate);
router.route("/check/otp").post(validateBody(schemas.checkOtp), UserController.checkOtp);
router.route("/update/newpassword").put(validateBody(schemas.updateNewpassword), UserController.updateNewPassword)
router.route("/changepassword").put(passportJWT, validateBody(schemas.changePassword), UserController.changePassword)

module.exports = router;
