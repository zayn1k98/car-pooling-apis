const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./carpooling-a5e4c-167f44a9691b.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

var usersList = [];
var users = {'data':usersList};

async function getDrivers (){
  const list =[];
  const tempUsersList =  await db.collection('drivers').get();

  if(tempUsersList.empty){
    console.log("NO EXISTING USERS");
    return;
  }
    tempUsersList.forEach(
        doc =>{
        list.push(doc.data());
        }
    );

    usersList = list;

  users = {'data':JSON.stringify(usersList)};
  const allUsers = JSON.stringify(users);

  return allUsers;
}

async function addDriver(driverDetails){
    await db.collection('drivers').doc(driverDetails['phoneNumber']).set(driverDetails);

    console.log(`DRIVER ADDED SUCCESSFULLY : ${driverDetails.toString()}`);
}

async function approveDriver(driverDetails){
    await db.collection('drivers').doc(driverDetails['phoneNumber']).update({
        'isDriverApproved':driverDetails['isDriverApproved'],
    });

    console.log(`DRIVER DETAILS MODIFIED SUCCESSFULLY !`);
}

async function deleteDriver(driverDetails){
    await db.collection('drivers').doc(driverDetails).delete();

    console.log("DRIVER DELETED SUCCESSFULLY !");
}

module.exports={getDrivers, addDriver, approveDriver, deleteDriver};