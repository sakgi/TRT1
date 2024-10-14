
// import admin from "firebase-admin";
// import serviceAccount from "./ticket-raiser-a3891-firebase-adminsdk-ruv27-463c3e36e6.json";

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://ticket-raiser-a3891-default-rtdb.asia-southeast1.firebasedatabase.app"
// });

// export default admin;
import admin from "firebase-admin";
import firebaseConfig from './ticket-raiser-a3891-firebase-adminsdk-ruv27-463c3e36e6.json' assert { type: 'json' };

// Use firebaseConfig directly as the service account
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: "https://ticket-raiser-a3891-default-rtdb.asia-southeast1.firebasedatabase.app"
});

export default admin;
