const stripe = require('stripe')('sk_test_...');
const express = require('express');
const app = express();

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const serviceAccount = require("./carpooling-a5e4c-167f44a9691b.json");
const { database } = require('firebase-admin');

const http = require('http');

const options = {
    hostname :'65.2.9.145',
    port:'3000',
    path:'/home',
    method:'GET',
};

const req = http.request(options, (response)=>{
    let data = '';

    response.on('data',(chunk)=>{
        data+=chunk;
    });

    response.on('end',()=>{
        console.log(data);
    });

    req.on('error',(e)=>{
        console.error(`Error: ${e.message}`);
    });

    req.end();
});


app.get('/',(request, response)=>{
    response.send('Welcome!');
});

initializeApp({
    credential: cert(serviceAccount)
});

app.listen(5000,()=>{
    console.log("NODE APP IS RUNNING ...");
});
// const endpointSecret = "whsec_cecc98266fc99d5f8270c35c364b9ef3bfb29e3f72f007398c457068ffb36ba5";

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.amount_capturable_updated':
//       const paymentIntentAmountCapturableUpdated = event.data.object;
//       // Then define and call a function to handle the event payment_intent.amount_capturable_updated
//       break;
//     case 'payment_intent.canceled':
//       const paymentIntentCanceled = event.data.object;
//       // Then define and call a function to handle the event payment_intent.canceled
//       break;
//     case 'payment_intent.created':
//       const paymentIntentCreated = event.data.object;
//       // Then define and call a function to handle the event payment_intent.created
//       break;
//     case 'payment_intent.partially_funded':
//       const paymentIntentPartiallyFunded = event.data.object;
//       // Then define and call a function to handle the event payment_intent.partially_funded
//       break;
//     case 'payment_intent.payment_failed':
//       const paymentIntentPaymentFailed = event.data.object;
//       // Then define and call a function to handle the event payment_intent.payment_failed
//       break;
//     case 'payment_intent.processing':
//       const paymentIntentProcessing = event.data.object;
//       // Then define and call a function to handle the event payment_intent.processing
//       break;
//     case 'payment_intent.requires_action':
//       const paymentIntentRequiresAction = event.data.object;
//       // Then define and call a function to handle the event payment_intent.requires_action
//       break;
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       console.log("PAYMENT SUCCEEDED");
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });

// app.listen(4242, () =>{ 
//     console.log('Running on port 4242');

//     getTransactions();
// });