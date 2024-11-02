const firebase = require("firebase-admin");
const serviceAccount = require('../wastebin-tracker-firebase-adminsdk-pwn8p-817bc87978.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://wastebin-tracker-default-rtdb.firebaseio.com/'
});

const firebaseDatabase = firebase.database();

module.exports = {firebaseDatabase}