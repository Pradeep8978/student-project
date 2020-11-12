const JWT = require('jsonwebtoken');
const Feedback = require('../models/feedback');
const Customers = require('../models/customers');

const { JWT_SECRET } = require('../configuration');

module.exports = {
    createFeedback: async (req, res) => {        
    Customers.findOne({_id:req.user.id}, function(err, result) {
      const customerFeedBack  = {...req.body};
      const newCustomerFeedback = new Feedback(customerFeedBack); 
      newCustomerFeedback.save(function (err, feedBackdetails){
        if (err){
          req.status(405).send(err);
        }
        else{
          console.log("FEEDBACK DETAILS=>", feedBackdetails)
          res.status(200).json(feedBackdetails);
        }
      });
    });
    },
    getFeedback: async (req, res, next) => {
        Feedback.find({} , function (err, response) {
          if (err) res.status(404).send(err);        
            res.json(response);
        });
    }
}