const http = require('http');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const router = express.Router();

const {getDrivers, addDriver, approveDriver, deleteDriver,} = require('./users_crud.js');

app.get('/',(req,res)=>{

    res.json({'message':'Hello World!'});
});

app.get('/get_drivers',(req,res)=>{

    var allUsers = [];
    async function getAllDrivers(){
        allUsers = await getDrivers();

        res.send(allUsers);
    }

    getAllDrivers();
});

app.post('/add_driver',(req,res)=>{

    if(Object.keys(req.body).length === 0){
        res.status(400).send({'error':'Request body is null'});
    }else if(!('name' in req.body)){
        res.status(400).send({'error':'Name field is missing'});
    }
    else if(!('phone_number' in req.body)){
        res.status(400).send({'error':'Phone number field is missing'});
    }
    else if(!('dob' in req.body)){
        res.status(400).send({'error':'Date of birth field is missing'});
    }
    else{
        addDriver(req.body);
        res.send(req.body);
    }
});

app.patch('/approve_driver',(req,res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({'error':'Request body is null'});
    }
    else if(!('phone_number' in req.body)){
        res.status(400).send({'error':'Phone number field is missing'});
    }
    else{
        approveDriver(req.body);
        res.send(req.body);
    }
});

app.delete('/delete_driver',(req,res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).send({'error':'Request body is null'});
    }
    else if(!('phone_number' in req.body)){
        res.status(400).send({'error':'Phone number field is missing'});
    }
    else{
        deleteDriver(req.body.phone_number);
        res.send(req.body);
    }
});

const port = 8000;

app.listen(port, ()=>{

    console.log(`NODE SERVER LISTENING AT : ${port}`);
});

// http.createServer(function (req, res) {

//     http.request();

//     switch(req.url){
//         case "/":
//             res.writeHead(200);
//             res.end("Welcome home !");
//             break
//         case "/getUsers":
//             getAllDrivers();
//             break
//         case "/addDriver":
//             addNewDriver();
//             break
//         case "/approveDriver":
//             approveDriverStatus();
//             break
//         case "/deleteDriver":
//             deleteCurrentDriver();
//             break
//         case "/test":
//             testRequestBody();
//             break
//         default:
//             res.writeHead(404);
//             res.end(JSON.stringify({error:"Resource not found"}));
//     }

//     var allUsers = [];
//     async function getAllDrivers(){
//         res.setHeader('Content-Type', 'application/json');
//         allUsers = await getDrivers();
//         res.writeHead(200);
//         res.end(allUsers);
//     }

//     async function addNewDriver(){
//         res.setHeader('Content-Type', 'application/json');
        
//         let requestBody ={
//             "name":"Mohammed Nausheer",
//             "dob":"12/06/1997",
//             "isDriverApproved":false,
//             "phoneNumber":"9876543210"
//           };

//         req.on('data',chunk=>{
//             requestBody+=chunk.toString();
//         });

//         addDriver(requestBody);

//         req.on('end',()=>{
//             const responseData = {
//                 message: 'Driver added successfully ... !',
//                 requestBody: requestBody,
//             };

//             res.end(JSON.stringify(responseData));
//         });
//     }

//     async function approveDriverStatus(){
//         res.setHeader('Content-Type', 'application/json');
        
//         let requestBody ={
//             "isDriverApproved":true,
//             "phoneNumber":"9876543210"
//           };

//         req.on('data',chunk=>{
//             requestBody+=chunk.toString();
//         });

//         approveDriver(requestBody);

//         req.on('end',()=>{
//             const responseData = {
//                 message: 'Driver verified successfully ... !',
//                 requestBody: requestBody,
//             };

//             res.end(JSON.stringify(responseData));
//         });
//     }

//     async function deleteCurrentDriver(){
//         let requestBody ="9876543210";

//         req.on('data',chunk=>{
//             requestBody+=chunk.toString();
//         });

//         deleteDriver(requestBody);

//         req.on('end',()=>{
//             const responseData = {
//                 message: 'Driver deleted successfully ... !',
//                 requestBody: requestBody+" DELETED SUCCESSFULLY ... !",
//             };

//             res.end(JSON.stringify(responseData));
//         });
//     }

//     async function testRequestBody(){
//         let requestBody = '';

//         req.on('data',chunk=>{
//             requestBody+=chunk.toString();
//         });

//         res.end(requestBody);
//     }
//   }).listen(8000);