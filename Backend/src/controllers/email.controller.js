
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


let emailController = {
  sendMail: async function (req,res) {
    const {email, subject} = req.body;
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: ({path: 'src/views/email.html'})
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({message: "Email sent"})
      }
    });
  }
}


module.exports = {
  emailController
}