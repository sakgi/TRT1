// import express from "express";

// const router = express.Router();

// export default router;

// import express from "express";
// import admin from "../config/firebaseAdmin"; // Import Firebase Admin SDK
// import generateJwtToken from "../utils/generateJwtToken"; // Import the generateJwtToken function

// const router = express.Router();

// router.post("/clients/save", async (req, res) => {
//   const { idToken } = req.body;

//   try {
//     // Verify the ID token
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const uid = decodedToken.uid;

//     // Check if the user exists in Firestore
//     const userRef = admin.firestore().collection('users').doc(uid);
//     const userDoc = await userRef.get();

//     if (userDoc.exists) {
//       // User exists, generate a JWT token
//       const token = generateJwtToken(userDoc.data());

//       res.status(200).json({ token });
//     } else {
//       res.status(401).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error verifying ID token:", error);
//     res.status(401).json({ message: "Unauthorized" });
//   }
// });

// export default router;



// 


import express from "express";
import admin from "../config/firebaseAdmin"; // Import Firebase Admin SDK

const router = express.Router();

// Endpoint to get Employee-ID by Email
router.post("/get-email", async (req, res) => {
  const { email } = req.body;

  try {
    // Fetch the Employee-ID from Firestore using the Email
    const userRef = admin.firestore().collection('users').where('email', '==', email);
    const snapshot = await userRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "Email ID not found" });
    }

    const userDoc = snapshot.docs[0];
    const employeeId = userDoc.data().employeeId;

    res.status(200).json({ employeeId });
  } catch (error) {
    console.error("Error fetching Employee-ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
