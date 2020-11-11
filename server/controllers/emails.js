const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
var smtpTransport = require("nodemailer-smtp-transport");
module.exports = {
  postEmail: async (req, res) => {
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: '20perorder@gmail.com',
    //         pass: 'tqjpnurkijsnfjxs'
    //     }
    // });

    var transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      secure: true,
      secureConnection: false, // TLS requires secureConnection to be false
      tls: {
        ciphers: "SSLv3",
      },
      requireTLS: true,
      port: 465,
      debug: true,
      auth: {
        user: "info@20perorder.com",
        pass: "pass@19674",
      },
    });
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    const mailOptions = {
      from: "info@20perorder.com",
      to: req.body.toMail,
      subject: req.body.title,
      text: req.body.content,
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
  },
  confirmationEmail: async ({ email }) => {
    fs.readFile(
      path.join(__dirname, "../templates", "referaltemplate.html"),
      (err, html) => {
        if (err) return res.status(400).send(err);
        const transporter = nodemailer.createTransport({
          host: "smtpout.secureserver.net",
          secure: true,
          secureConnection: false, // TLS requires secureConnection to be false
          tls: {
            ciphers: "SSLv3",
          },
          requireTLS: true,
          port: 465,
          debug: true,
          auth: {
            user: "info@20perorder.com",
            pass: "pass@19674",
          },
        });
        const mailOptions = {
          from: "Ramu Stock Broking <info@20perorder.com>",
          to: email,
          subject: "confirmation Email",
        //   text: "Thank you for submitting the details on Referal Page",
            html: html
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("ERROR", error);
            // res.status(400).json({ message: "Error", error });
          } else {
            console.log("Email sent: " + info.response);
            //res.json(info.response);
          }
        });
      }
    );
  },
  signupConfirm: async ({ email }) => {
    fs.readFile(
      path.join(__dirname, "../templates", "registertemplate.html"),
      (err, html) => {
        if (err) return res.status(400).send(err);
        const transporter = nodemailer.createTransport({
          host: "smtpout.secureserver.net",
          secure: true,
          secureConnection: false, // TLS requires secureConnection to be false
          tls: {
            ciphers: "SSLv3",
          },
          requireTLS: true,
          port: 465,
          debug: true,
          auth: {
            user: "info@20perorder.com",
            pass: "pass@19674",
          },
        });
        const mailOptions = {
          from: "Ramu Stock Broking <info@20perorder.com>",
          to: email,
          subject: "20perorder - Thank you for Register",
          // text: "Thank you for Registering with Ramu stock brokering services",
          html: html,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("ERROR", error);
            //res.status(400).json({ message: "Error", error });
          } else {
            console.log("Email sent: " + info.response);
            // res.json(info.response);
          }
        });
      }
    );
  },

  templateDemo: async (req, res) => {
    fs.readFile(
      path.join(__dirname, "../templates", "referaltemplate.html"),
      (err, html) => {
        if (err) return res.status(400).send(err);
        const transporter = nodemailer.createTransport({
          host: "smtpout.secureserver.net",
          secure: true,
          secureConnection: false, // TLS requires secureConnection to be false
          tls: {
            ciphers: "SSLv3",
          },
          requireTLS: true,
          port: 465,
          debug: true,
          auth: {
            user: "info@20perorder.com",
            pass: "pass@19674",
          },
        });
        const mailOptions = {
          from: "Ramu Stock Broking <info@20perorder.com>",
          to: req.body.email,
          subject: "Thank you",
          // text: "Thank you for Registering with Ramu stock brokering services",
          html: html,
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
      }
    );
  },
};
