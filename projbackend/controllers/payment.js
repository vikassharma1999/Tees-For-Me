var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "9y2qvyk2w4wjx2dz",
  publicKey: "2gn5q67w2tkjqb8k",
  privateKey: "403a4ffd14f288144e1862d680f68bac"
});






exports.getToken = (req,res)=>{

    gateway.clientToken.generate({}, function (err, response) {
         if(err){
             res.status(500).send(err)
         }
         else{
             res.send(response)
         }
      });
}
exports.processPayment = (req,res)=>{
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromtheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromtheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err)
          {
              res.status(400).send(err)
          }
          else{
              res.send(result)
          }
      });
}