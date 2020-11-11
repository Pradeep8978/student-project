const JWT = require("jsonwebtoken");
const Referal = require("../models/referals");
const Users = require("../models/users");
const EmailControler = require("./emails");
const { JWT_SECRET } = require("../configuration");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const getImageUrl = (body, id) => {
  const imgPath = `uploads/images/referal_${body.name
    .split("/")
    .join("")}_${new Date().getTime()}_${id}.png`;
  return imgPath;
};

// const getAggregationPipeline = (params) => {
//   const pipeline = [];
//   const {category, search} = params;
//   if(category){
//     pipeline.push({
//       categories: {
//         $in: [
//           category
//         ]
//       }
//     })
//   }
//   return pipeline;
// }

module.exports = {
  createReferal: async (req, res, next) => {
    const referalObj = { ...req.body, createdOn: new Date().getTime() };
    const newReferal = new Referal(referalObj);
    let foundUser = await Users.findOne({ email: req.body.email });
    let foundReferal = await Referal.findOne({ email: req.body.email });
    if(foundUser || foundReferal){
      return res.status(402).send({message: 'User already Exists'});
    }
    newReferal.save(function (err, referalDetails) {
      if (err) {
        res.status(405).send(err);
      } else {
        EmailControler.confirmationEmail(req.body);
        // const token = signToken(referalDetails);
        console.log("Referal OBJECT=>", referalDetails);
        res.status(200).json({ referalDetails });
      }
    });
  },
  getReferals: async (req, res, next) => {
    const searchConfig = {};
    if(req.query.referalId){
      searchConfig.referalId = req.query.referalId
    }
    if (req.query.name) {
      searchConfig.name = req.query.name;
      Referal.find(
        {
          name: {
            $regex: new RegExp("^" + searchConfig.name.toLowerCase(), "i"),
          },
        },
        function (err, response) {
          if (err) res.status(404).send(err);
          res.json(response.reverse());
        }
      );
    } else {
      Referal.find(searchConfig, function (err, response) {
        if (err) res.status(404).send(err);
        res.json(response.reverse());
      });
    }
  },
  updateReferal: async (req, res) => {
    const id = req.params.id;
    const updatedReferal = req.body;
    updatedReferal.modifiedOn = new Date().getTime();
    Referal.findOneAndUpdate(
      { _id: id },
      updatedReferal,
      { multi: false },
      function (err, response) {
        if (err) res.json({ message: "Error in updating referal" });
        res.json(response);
      }
    );
  },
  deleteReferal: async (req, res) => {
    Referal.findOneAndDelete({ _id: req.params.id }, function (err, response) {
      if (err) res.json({ message: "Error in deleteting referal" });
      res.json(response);
    });
  },
};
