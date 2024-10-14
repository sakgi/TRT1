// import jwt from "jsonwebtoken";

// const generateJwtToken = (user) => {
//   const payload = {
//     uid: user.uid,
//     email: user.email,
//   };

//   const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
//   return token;
// };

// export default generateJwtToken;

import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

const generateJwtToken = (user) => {
  const payload = {
    uid: user.uid,
    email: user.email,
  };

  // Example secret key
  const secretKey = "mySuperSecretKeyThatNoOneShouldGuess123!";

  const token = sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};

export default generateJwtToken;
