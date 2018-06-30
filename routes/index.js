const templates = require('../templates/templates');

const express = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('email');
});

router.post('/send-email', (req, res, next) => {
  const { email, subject, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAILACC,
      pass: process.env.EMAILPASS,
    }
  });
  transporter.sendMail({
    from: 'alan.cadero@gmail.com',
    to: email, 
    subject: subject, 
    html: templates.templateExample2(message),
  })
  .then(info => res.render('message', {email, subject, message, info}))
  .catch(error => console.log(error));
});

module.exports = router;
