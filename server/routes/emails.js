
const express = require('express');
const router = require('express-promise-router')();
const { validateBody, schemas, validateParams } = require('../helpers/routeHelpers');
const EmailController = require('../controllers/emails');
router.route('/email')
  .post(validateBody(schemas.emailSchema), EmailController.postEmail);
router.route('/templatedemo')
  .post( EmailController.templateDemo)  
module.exports = router;