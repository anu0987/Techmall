const express = require('express')
const userModel = require('../models/UserModel');

const sendMail = require('./EmailService')

const route = express.Router()

const stripe = require('stripe')('sk_test_51H47bhGn0V8TkBtWMntS8EPc6f56rRtIjwqH3deH11VoqwzvhqfGlbMF5EZFBdyvT8Q8vkYQUzpdCv2HE7vSmuuB00H4H1kV3H');

// confirm the paymentIntent
route.post('/pay', async (request, response) => {
    try {
     console.log(request.body)
      let intent = await stripe.paymentIntents.create({
        payment_method: request.body.payment_method_id,
        description: "TechMall Payment",
        amount: request.body.amount * 100,
        currency: 'inr',
        confirmation_method: 'manual',
        confirm: true
      });
      // Send the response to the client
      response.send(generateResponse(intent));
    } catch (e) {
      // Display error on client
      return response.send({ error: e.message });
    }
  });
  
  const generateResponse = (intent) => {
    if (intent.status === 'succeeded') {
      // The payment didn’t need any additional actions and completed!
      // Handle post-payment fulfillment
      return {
        success: true
      };
    } else {
      // Invalid status
      return {
        error: 'Invalid PaymentIntent status'
      };
    }
  };








route.post('/register',(req,res)=>
{
  var otp = Math.floor(Math.random()*90000) + 10000; 
  userModel.saveUser(req.body,otp,function(status)
    {
        sendMail(req.body.name,req.body.email,otp);        
        res.send({status:status})
    })
})




route.post('/login',(req,res)=>
{
    userModel.loginUser(req.body,function(record)
    {        
        if(record==false)
            res.send({status:false})
        else
        {
          if(record.isverify)
          {
            req.session.user = {
                type:'customer',
                email : req.body.email
              }
            res.send({status:true,verify:true})      
          }else{
            res.send({status:true,verify:false})      
          }
        }
    })
})



module.exports = route