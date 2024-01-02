const stripe = require('stripe')('sk_test_...');
const express = require('express');
const app = express();

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const serviceAccount = require("./carpooling-a5e4c-167f44a9691b.json");
const { database } = require('firebase-admin');

// app.get('/',(request, response)=>{
//     console.log('please wait ...');

//     response.send('Welcome!');
// });

// initializeApp({
//     credential: cert(serviceAccount)
// });

// app.listen(3000,()=>{
//     console.log("NODE APP IS RUNNING ...");
//     console.log('Trying to ping http request');
// });

const http = require('http');

const options = {
    hostname :'ec2-65-2-9-145.ap-south-1.compute.amazonaws.com',
    path:'/',
    method:'GET',
};

console.log('trying to ping http server');

const req = http.request(options, (response)=>{
    console.log('We are pinging the http request');
    let data = '';

    response.on('data',(chunk)=>{
        data+=chunk;
    });

    response.on('end',()=>{
        console.log(data);
        response.send("welcome to the server!");
    });
});

req.on('error',(e)=>{
    console.error(`${e}`);
});
req.end();