const Feedback = require('../models/feedback');

module.exports = {
    createFeedback: async (req, res) => {        
      const newCustomerFeedback = new Feedback({...req.body, customer: req.user.id}); 
      newCustomerFeedback.save(function (err, feedBackdetails){
        if (err){
          req.status(405).send(err);
        }
        else{
          console.log("FEEDBACK DETAILS=>", feedBackdetails)
          res.status(200).json(feedBackdetails);
        }
      });
    },
    getFeedback: async (req, res, next) => {
        Feedback.find({}).populate('customer').exec((err, response) => {
          if (err) res.status(404).send(err);        
            res.json(response);
        });
    }
}