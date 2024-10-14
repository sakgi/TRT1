// const admin = require('../config/firebaseAdmin');

// const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).send('Unauthorized');
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     return res.status(401).send('Unauthorized');
//   }
// };

// module.exports = authMiddleware;

// import auth from "../config/firebaseAdmin.js";

// const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).send("Unauthorized");
//   }

//   try {
//     const decodedToken = await auth().verifyIdToken(token);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     return res.status(401).send("Unauthorized");
//   }
// };

// export default authMiddleware;

// import admin from "../config/firebaseAdmin.js"; // Correct import of Firebase Admin SDK

// const authMiddleware = async (req, res, next) => {
// const token = req.headers.authorization?.split(" ")[1]; // Expecting Bearer <token>

//   if (!token) {
//     return res.status(401).send("Unauthorized: No token provided");
//   }

//   try {
//     // Verify the token using Firebase Admin SDK
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.user = decodedToken; // Attach the decoded user data to req.user
//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     return res.status(401).send("Unauthorized: Invalid token");
//   }
// };

// export default authMiddleware;
import admin from "../config/firebaseAdmin.js"; // Correct import of Firebase Admin SDK

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  try {
    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Attach the decoded user data to req.user
    req.user = decodedToken;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error verifying token:", error);

    // Differentiating between different token errors
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.code === 'auth/argument-error') {
      return res.status(400).json({ message: "Invalid token" });
    }

    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
