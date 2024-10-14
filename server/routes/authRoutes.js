// import { Router } from "express";
// const router = Router();
// import generateJwtToken from "../utils/generateJwtToken.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// router.post("/save", authMiddleware, (req, res) => {
//   const { email } = req.user;
//   let role = "User";

//   if (email.endsWith("@gmail.com")) {
//     role = "Admin";
//   } else if (email.endsWith("@superadmin.com")) {
//     role = "SuperAdmin";
//   }

//   const token = generateJwtToken(req.user);
//   res.status(200).send({ token, role });
// });

// export default router;




// import { Router } from "express";
// import generateJwtToken from "../utils/generateJwtToken.js";
// import authMiddleware from "../middleware/authMiddleware.js";
// import admin from "../config/firebaseAdmin.js"; // Firebase Admin SDK to interact with Firestore

// const router = Router();

// router.post("/save", authMiddleware, async (req, res) => {
//   const { email } = req.user; // Extract the email from the verified token

//   try {
//     // Fetch the user's role from Firestore
//     const userRef = admin.firestore().collection('users').doc(email);
//     const doc = await userRef.get();

//     if (!doc.exists) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     const userData = doc.data();
//     const role = userData.role || "User"; // Default to "User" if no role is found

//     // Generate JWT Token (optional if you're using Firebase token for frontend)
//     const token = generateJwtToken(req.user);

//     // Send the role and token back to the client
//     res.status(200).send({ token, role });
//   } catch (error) {
//     console.error("Error fetching user role:", error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// export default router;

import { Router } from "express";
import generateJwtToken from "../utils/generateJwtToken.js";
import authMiddleware from "../middleware/authMiddleware.js";
import admin from "../config/firebaseAdmin.js"; // Firebase Admin SDK to interact with Firestore

const router = Router();

router.post("/save", authMiddleware, async (req, res) => {
  const { uid } = req.user; // Extract the UID from the verified token

  try {
    // Fetch the user's role from Firestore
    const userRef = admin.firestore().collection('users').doc(uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).send({ message: "User not found" });
    }

    const userData = doc.data();
    const role = userData.role || "User"; // Default to "User" if no role is found
    
    // Role-based handling
    if (role === "SuperAdmin") {
      // SuperAdmin specific logic (if needed)
      console.log("SuperAdmin access");
    } else if (role === "Admin") {
      // Admin specific logic (if needed)
      console.log("Admin access");
    } else {
      // User-specific logic
      console.log("User access");
    }

    // Generate JWT Token (optional if you're using Firebase token for frontend)
    const token = generateJwtToken(req.user);

    // Send the role and token back to the client
    res.status(200).send({ token, role });
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;


