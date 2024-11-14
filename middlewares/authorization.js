const { admin } = require('../config/adminSDK');

const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    // Check if Authorization header is present
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Extract the token (it should be in the format: "Bearer <token>")
    const tokenParts = authorizationHeader.split(' ');

    // Ensure the token is in the correct format
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: "Unauthorized: Token not provided correctly" });
    }

    const idToken = tokenParts[1];

    // Verify the token using Firebase Admin SDK
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);

    // Attach the decoded token (user data) to req.user
    req.user = {
      uid: decodedIdToken.uid,
      email: decodedIdToken.email,
      ...decodedIdToken // Include other token details if needed (e.g., roles, claims)
    };

    // Continue to the next middleware/route
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(403).json({ message: "Unauthorized: Invalid token", error: err.message });
  }
};

module.exports = { verifyToken };