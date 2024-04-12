
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

  subscribe: async function (req,res,email) {

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Hírlevél feliratkozás",
      text: "Sikeresen feliratkozott a hírlevelünkre!"
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({message: "Subscribe was successful"})
      }
    });
  },

  sendResetPassword: async function (req, res, email, token) {
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Jelszó-visszaállítás",
      text: `Kód a jelszó visszaállításához: ${token}`
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
}


module.exports = {
  emailController
}