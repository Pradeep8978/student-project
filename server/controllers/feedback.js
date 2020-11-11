const JWT = require('jsonwebtoken');
const Feedback = require('../models/feedback');
const Customers = require('../models/customers');

const { JWT_SECRET } = require('../configuration');
const signToken = user => {
    return JWT.sign({
        iss: 'ramustocks',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
}
module.exports = {
    createFeedback: async (req, res) => {        
    Customers.findOne({_id:req.user.id}, function(err, result) {
      const customerFeedBack  = {...req.body, feedBackOn: new Date().getTime(),customerId:req.user.id,customerName:result.name,customerImage:result.image};
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