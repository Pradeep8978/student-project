const JWT = require("jsonwebtoken");
const Users = require("../models/users");
const Referals = require("../models/referals");
const emailController = require("./emails");
const { JWT_SECRET } = require("../configuration");
const multer = require("multer");
const mongoose = require("mongoose");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { response } = require("express");

const signToken = (user) => {
  return JWT.sign(
    {
      iss: "ramustocks",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email } = req.body;
    let foundUsers = await Users.findOne({ email: email.trim() });
    if (foundUsers) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    await Referals.findOneAndUpdate(
      { email: req.body.email }
    );
    const cusObj = { ...req.body, role: 'customer', createdOn: new Date().getTime() };
    const newUsers = new Users(cusObj);
    const userObj = await newUsers.save();
    // Generate the token
    const token = signToken(newUsers);
    // console.log("CUSTOMER OBJECT=>", userObj);
    emailController.signupConfirm(req.body);
    res.status(200).json({ token, profile: userObj });
  },

  createEmployee: async (req, res, next) => {
    if (req.user.role !== "admin") return res.send(403);
    const { email } = req.body;
    let foundUsers = await Users.findOne({ email: email.trim() });
    if (foundUsers) {
      return res.status(403).json({ error: "Email is already in use" });
    }
    const cusObj = {
      ...req.body,
      createdOn: new Date().getTime(),
      role: "employee",
    };
    const newUsers = new Users(cusObj);
    const userObj = await newUsers.save();
    // Generate the token
    const token = signToken(newUsers);
    console.log("CUSTOMER OBJECT=>", userObj);
    res.status(200).json({ token, profile: userObj });
  },

  signIn: async (req, res, next) => {
    console.log("User Details =>", req.user);
    // Generate token
    console.log("CUSTOMER SIGN IN =>", req.user);
    const token = signToken(req.user);
    // res.setHeader('Authorization', token);
    res.status(200).json({ token, profile: req.user });
  },

  signOut: async (req, res, next) => {
    res.clearCookie("access_token");
    // console.log('I managed to get here!');
    res.json({ success: true });
  },

  checkAuth: async (req, res, next) => {
    // req.user.id = req.user._id;
    const token = signToken(req.user);
    console.log("I managed to get here!");
    res.json({ token });
  },

  getUsers: async (req, res, next) => {
    const findSchema = req.query.role
      ? {
        role: req.query.role,
      }
      : {};
    const users = await Users.find(findSchema);
    res.json(users);
  },

  updateProfile: async (req, res) => {
    Users.findOneAndUpdate({ _id: req.user.id }, req.body, (err, response) => {
      if (err) res.status(400).json({ message: "Error in updating user" });
      else res.json(response);
    });
  },

  addNewAddress: (req, res) => {
    Users.update(
      { _id: req.user.id },
      { $push: { address: req.body } },
      (err, response) => {
        if (err)
          res
            .status(400)
            .json({ message: "Error in adding user Address", error: err });
        else res.json(response);
      }
    );
  },

  removeAddress: (req, res) => {
    console.log("PARAMS =>", req.params);
    Users.updateOne(
      { _id: req.user.id },
      {
        $pull: {
          address: { _id: mongoose.Types.ObjectId(req.params.addressId) },
        },
      },
      (err, response) => {
        if (err)
          res
            .status(400)
            .json({ message: "Error in Deleting user Address", error: err });
        else res.json(response);
      }
    );
  },

  updateAddress: (req, res) => {
    Users.updateOne(
      { _id: req.user.id, "address.id": req.params.addressId },
      { $set: { "address[0].name": req.body.name } },
      (err, response) => {
        if (err)
          res
            .status(400)
            .json({ message: "Error in adding user Address", error: err });
        else res.json(response);
      }
    );
  },

  getProfile: async (req, res) => {
    res.send(req.user);
  },

  deleteUser: async (req, res) => {
    Users.findOneAndDelete({ _id: req.params.id }, function (err, response) {
      if (err) res.json({ message: "Error in deleteting product" });
      res.json(response);
    });
  },
  changePassword: async (req, res) => {
    console.log("FIND PASSEORD =>", req.user);
    const oldpassword = req.body.oldpassword;
    let findPassword = await Users.findOne({ _id: req.user.id });
    const hash = findPassword.password;
    bcrypt.compare(oldpassword, hash, function (err, isMatch) {
      if (err) {
        throw err;
      } else if (!isMatch) {
        res.status(400).json({ message: "old password is not match" });
      } else {
        Users.findOneAndUpdate(
          { _id: req.user.id },
          { password: req.body.newpassword },
          (err, response) => {
            if (err)
              res.status(400).json({ message: "Error in updating customer" });
            else res.json({ message: "success" });
          }
        );
      }
    });
  },
  otpGenerate: async (req, res) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let foundUsers = await Users.findOne({ email: req.body.email.trim() });
    if (!foundUsers) {
      return res.status(403).json({ message: "Email does not exit" });
    }
    Users.findOneAndUpdate(
      { email: req.body.email },
      { otp: otp },
      (err, response) => {
        if (err) res.status(400).json({ message: "Error in updating otp" });
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "designingcyberpolicies@gmail.com",
            pass: "patjqzoccjoqynzm",
          },
        });
        const mailOptions = {
          from: "designingcyberpolicies@gmail.com",
          to: req.body.email,
          subject: "Secure file Authentication",
          text: `your otp is ${otp}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("ERROR", error);
            res.status(400).json({ message: "Error", error });
          } else {
            console.log("Email sent: " + info.response);
            res.json(info.response);
          }
        });
        res.json({ message: 'OTP Sent' });
      }
    );
  },
  checkOtp: async (req, res) => {
    Users.findOne(
      { email: req.body.email },
      (err, response) => {
        if (err) res.status(400).json({ message: "Error in updating otp" });
        else {
          if (!response) {
            // res.status(404).json({ message: "Invalid otp or email", failures: response.failures + 1  });
            Users.findOneAndUpdate(
              { email: req.body.email },
              { otp: "", failures: response.failures + 1 },
              (err, response) => { }
            );
          } else if (Number(req.body.otp) !== Number(response.otp)) {
            res.status(404).json({ message: "Invalid otp or email", failures: response.failures + 1 });
            Users.findOneAndUpdate(
              { email: req.body.email },
              {failures: response.failures + 1 },
              (err, response) => { }
            );
          } else {
            Users.findOneAndUpdate(
              { email: req.body.email },
              { otp: "", failures: 0 },
              (err, response) => { }
            );
            res.send({ success: true });
          }
        }
      }
    );
  },

  allowFileAccess: (req, res) => {
    Users.findOneAndUpdate(
      { _id: req.params.id },
      { otp: "", failures: 0 }, 
      (err, response) => {
        if (err)
          res.status(400).json({ message: "Sorry, something wrong" });
        else res.json({ message: 'File acces granted' });
      }
    );
  },
  updateNewPassword: async (req, res) => {
    let foundUsers = await Users.findOne({ email: req.body.email.trim() });
    if (!foundUsers) {
      return res.status(403).json({ error: "Email is not exit" });
    }
    Users.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.newpassword },
      (err, response) => {
        const token = signToken(Users);
        if (err)
          res.status(400).json({ message: "Error in updating customer" });
        else res.json({ token, profile: req.user });
      }
    );
  },
};
