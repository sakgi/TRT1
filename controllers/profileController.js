// const { db } = require('../config/adminSDK');

// // Function to fetch user profile data
// const getUserProfile = async (req, res) => {
//   try {
//     const userId = req.user.uid;  // Assuming user ID is available in req.user

//     // Fetch the user document from Firestore
//     const userDoc = await db.collection('users').doc(userId).get();

//     if (!userDoc.exists) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const userData = userDoc.data();

//     // Send the user profile data
//     return res.status(200).json({
//       firstName: userData.First_Name || "",
//       lastName: userData.Last_Name || "",
//       employeeId: userData.Employee_ID || "",
//       email: userData.Email || "",
//       phone: userData.Mobile_Number || "",
//       circle: userData.Circle || "",
//       organization: userData.Organization || "",
//     });
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // Function to update editable user profile fields (email, phone, circle)
// const updateUserProfile = async (req, res) => {
//   try {
//     const userId = req.user.uid;
//     const { email, phone, circle } = req.body;

//     // Create an empty object to hold the updates
//     let updateData = {};

//     // Add fields to update only if they are provided in the request
//     if (email) {
//       updateData.Email = email;
//     }
//     if (phone) {
//       updateData.Mobile_Number = phone;
//     }
//     if (circle) {
//       updateData.Circle = circle;
//     }

//     // Check if there is anything to update
//     if (Object.keys(updateData).length === 0) {
//       return res.status(400).json({ message: 'No valid fields to update' });
//     }

//     // Update only the provided fields
//     await db.collection('users').doc(userId).update(updateData);

//     return res.status(200).json({ message: 'Profile updated successfully' });
//   } catch (error) {
//     console.error('Error updating user profile:', error);
//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


// module.exports = { getUserProfile, updateUserProfile };

const { db } = require('../config/adminSDK');

// Function to fetch user profile data
const getUserProfile = async (req, res) => {
  try {
    const {userId} = req.body;  // Assuming user ID is available in req.user

    // Fetch the user document from Firestore
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = userDoc.data();

    // Send the user profile data
    return res.status(200).json({
      firstName: userData.First_Name || "",
      lastName: userData.Last_Name || "",
      employeeId: userData.Employee_ID || "",
      email: userData.Email || "",
      phone: userData.Mobile_Number || "",
      circle: userData.Circle || "",
      organization: userData.Organization || "",
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Function to update editable user profile fields (email, phone, circle)
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { email, phone, circle } = req.body;

    // Create an empty object to hold the updates
    let updateData = {};

    // Add fields to update only if they are provided in the request
    if (email) {
      updateData.Email = email;
    }
    if (phone) {
      updateData.Mobile_Number = phone;
    }
    if (circle) {
      updateData.Circle = circle;
    }

    // Check if there is anything to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    // Update only the provided fields
    await db.collection('users').doc(userId).update(updateData);

    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};

