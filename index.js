const http = require('http');
const {getDrivers, addDriver, approveDriver, deleteDriver,} = require('./users_crud.js');

http.createServer(function (req, res) {
    switch(req.url){
        case "/":
            res.writeHead(200);
            res.end("Welcome home !");
            break
        case "/getUsers":
            getAllDrivers();
            break
        case "/addDriver":
            addNewDriver();
            break
        case "/approveDriver":
            approveDriverStatus();
            break
        case "/deleteDriver":
            deleteCurrentDriver();
            break
        case "/test":
            testRequestBody();
            break
        default:
            res.writeHead(404);
            res.end(JSON.stringify({error:"Resource not found"}));
    }

    var allUsers = [];
    async function getAllDrivers(){
        res.setHeader('Content-Type', 'application/json');
        allUsers = await getDrivers();
        res.writeHead(200);
        res.end(allUsers);
    }

    async function addNewDriver(){
        res.setHeader('Content-Type', 'application/json');
        
        let requestBody ={
            "name":"Mohammed Nausheer",
            "dob":"12/06/1997",
            "isDriverApproved":false,
            "phoneNumber":"9876543210"
          };

        req.on('data',chunk=>{
            requestBody+=chunk.toString();
        });

        addDriver(requestBody);

        req.on('end',()=>{
            const responseData = {
                message: 'Driver added successfully ... !',
                requestBody: requestBody,
            };

            res.end(JSON.stringify(responseData));
        });
    }

    async function approveDriverStatus(){
        res.setHeader('Content-Type', 'application/json');
        
        let requestBody ={
            "isDriverApproved":true,
            "phoneNumber":"9876543210"
          };

        req.on('data',chunk=>{
            requestBody+=chunk.toString();
        });

        approveDriver(requestBody);

        req.on('end',()=>{
            const responseData = {
                message: 'Driver verified successfully ... !',
                requestBody: requestBody,
            };

            res.end(JSON.stringify(responseData));
        });
    }

    async function deleteCurrentDriver(){
        let requestBody ="9876543210";

        req.on('data',chunk=>{
            requestBody+=chunk.toString();
        });

        deleteDriver(requestBody);

        req.on('end',()=>{
            const responseData = {
                message: 'Driver deleted successfully ... !',
                requestBody: requestBody+" DELETED SUCCESSFULLY ... !",
            };

            res.end(JSON.stringify(responseData));
        });
    }

    async function testRequestBody(){
        let requestBody = '';

        req.on('data',chunk=>{
            requestBody+=chunk.toString();
        });

        res.end(requestBody);
    }
  }).listen(8000);