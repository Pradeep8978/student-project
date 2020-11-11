const JWT = require("jsonwebtoken");
const Review = require("../models/reviews");
const Customers = require("../models/customers");
const { JWT_SECRET } = require("../configuration");
const multer = require("multer");
const fs = require("fs");
const getImageUrl = body => {
  const imgPath = `./uploads/images/product_${
    body.name
  }_${new Date().getTime()}.png`;
  return imgPath;
};
const signToken = user => {
  return JWT.sign(
    {
      iss: "ramustocks",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    JWT_SECRET
  );
};
module.exports = {
  customerReview: async (req, res) => {
    // const findProductReview = await Review.findOne({
    //   productId: req.params.productid,
    //   customerId: req.user.id
    // });
    // if (findProductReview) {
    //   return res.status(403).json({ error: "already reviewed" });
    // }
    const productReview = {
      ...req.body,
      reviewOn: new Date().getTime(),
      productId: req.params.productid,
      customerId: req.user.id,
      customerName: req.user.name,
      customerImage: req.user.image
    };
    const newProductReview = new Review(productReview);
    newProductReview.save(function(err, reviewDetails) {
      if (err) {
        res.status(405).send(err);
      } else {
        console.log("REVIEW DETAILS=>", newProductReview);
        res.status(200).json(reviewDetails);
      }
    });
  },

  getProductReviews: async (req, res) => {
    const { productId } = req.params;
    Review.find({ productId }, (err, reviews) => {
      if (err) {
        return req
          .status(404)
          .json({ message: "No reviews for this product", err });
      } else {
        res.send(reviews);
      }
    });
  },

  updateReview: async (req, res) => {
    const reviewId = req.params.reviewid;
    console.log("reviewId", reviewId);
    const updateReview = {};
    updateReview.modifiedOn = new Date().getTime();
    if (req.body.rating <= 5) {
      if (req.body.rating) updateReview.rating = req.body.rating;
    }
    if (req.body.description) updateReview.description = req.body.description;
    Review.findOneAndUpdate(
      { _id: reviewId },
      updateReview,
      { multi: false },
      function(err, response) {
        if (err) res.json({ message: "Error in updating review" });
        res.json(response);
      }
    );
  }
};
