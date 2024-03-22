
const { config } = require('dotenv')
config()
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

var mailOptions = {
  from: process.env.EMAIL,
  to: 'marko.bence.mendbajr@students.jedlik.eu',
  subject: 'Sending test email',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports = transporter.sendMail