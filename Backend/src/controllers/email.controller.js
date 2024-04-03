
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
  },
  subscribe: async function (req,res,email) {

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Hírlevél feliratkozás",
      text: "Sikeresen feliratkozott a hírnevünkre!"
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({message: "Subscribe was successful"})
      }
    });
  }
}


module.exports = {
  emailController
}