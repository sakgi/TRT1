const admin = require("firebase-admin");
const firebaseConfig = require('../utils/adminKey.json');

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  // databaseURL: "https://ticket-raiser-a3891-default-rtdb.asia-southeast1.firebasedatabase.app",
  // storageBucket: 'ticket-raiser-a3891.appspot.com'
  databaseURL: "https://trt-new-f11b3-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "trt-new-f11b3.appspot.com"
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

const storage = admin.storage(); 
module.exports = {admin, bucket, db, storage};