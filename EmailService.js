var nodemailer = require('nodemailer');

function sendMail(name,email,otp)
{
    var msg = "<html><body>";
    msg += "<h1>Hello "+ name +"</h1><hr>";
    msg += "This is a Verification mail for your account. So verify your account with this OTP <b> "+ otp +" </b>."
    msg+= "</body></html>";

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'justsample4mail@gmail.com',
        pass: 'sample@mail321'
    }
    });

    var mailOptions = {
    from: 'justsample4mail@gmail.com',
    to: email,
    subject: 'TechMall Email Verification',
    html: msg
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

module.exports = sendMail