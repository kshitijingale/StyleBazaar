const braintree = require('braintree')

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "qpf7xrrv9dv5y8z2",
    publicKey: "545dm62pbq47w7wv",
    privateKey: "4bedb6d15e2f7e0fba85124f49fa453e"
});

exports.getToken = async (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        } else {
            res.status(200).json({
                success: true,
                clientToken: response.clientToken
            })
        }
    });
}

exports.processPayment = async (req, res) => {
    const nonceFromClient = req.body.paymentMethodNonce
    const amountFromClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromClient,
        paymentMethodNonce: nonceFromClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        } else {
            res.status(200).json({
                success: true,
                result
            })
        }
    });
}