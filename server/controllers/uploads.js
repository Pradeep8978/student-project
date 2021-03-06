const JWT = require('jsonwebtoken');
const Upload = require('../models/uploads');

module.exports = {
    createUpload: async (req, res) => {        
      const customerFeedBack  = {...req.body, customer: req.user.id};
      const newCustomerUpload = new Upload(customerFeedBack); 
      newCustomerUpload.save((err, feedBackdetails) => {
        if (err){
          res.status(405).send(err);
        }
        else{
          console.log("FEEDBACK DETAILS=>", feedBackdetails)
          res.status(200).json(feedBackdetails);
        }
      });
    },
    getUpload: async (req, res, next) => {
      const filter = req.user.role === 'admin' ? {} : {customer: req.user.id}
        Upload.find(filter).populate('customer').exec((err, response) => {
          if (err) res.status(404).send(err);        
            res.json(response);
        });
    }
}