
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from "client/src/firebase/firebaseconfig"; // Import auth and db from firebase config
// import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'; // Import methods
// import { doc, updateDoc } from 'firebase/firestore'; // Import Firestore update methods
// import './ChangePassword.css';

// const ChangePassword = () => {
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigate = useNavigate();
//   const user = auth.currentUser; // Get the currently authenticated user

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if new password and confirm password match
//     if (newPassword !== confirmPassword) {
//       alert('New Password and Confirm Password must match!');
//       return;
//     }

//     // Re-authenticate the user with the current password
//     const credential = EmailAuthProvider.credential(
//       user.email,
//       currentPassword
//     );

//     try {
//       // Re-authenticate the user
//       await reauthenticateWithCredential(user, credential);
      
//       // If successful, update the password in Firebase Authentication
//       await updatePassword(user, newPassword);

//       // Now update the password in Firestore 'users' collection
//       const userDocRef = doc(db, 'users', user.uid); // Assuming user data is stored by their UID
//       await updateDoc(userDocRef, {
//         password: newPassword // Store the new password or omit it if you don't want to store passwords in Firestore
//       });

//       alert('Password changed successfully!');

//       // Navigate to the profile page after successful password change
//       navigate("/user-dashboard/profile");
//     } catch (error) {
//       console.error('Error updating password: ', error);
//       alert('Failed to update password. Please check your current password and try again.');
//     }
//   };

//   return (
//     <div className="change-password-container">
//       <form className="change-password-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="current-password">Current Password</label>
//           <input
//             type="password"
//             id="current-password"
//             placeholder="Current Password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="new-password">New Password</label>
//           <input
//             type="password"
//             id="new-password"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="confirm-password">Confirm Password</label>
//           <input
//             type="password"
//             id="confirm-password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="submit-btn">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "client/src/firebase/firebaseconfig";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import './ChangePassword.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage('New Password and Confirm Password must match!');
      setErrorOpen(true);
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        password: newPassword // Be cautious with storing passwords
      });

      setSuccessOpen(true); // Open success dialog
    } catch (error) {
      console.error('Error updating password: ', error);

      // Set specific error messages based on error codes
      switch (error.code) {
        case 'auth/wrong-password':
          setErrorMessage('The current password is incorrect. Please try again.');
          break;
        case 'auth/weak-password':
          setErrorMessage('The new password is too weak. Please choose a stronger password.');
          break;
        case 'auth/too-many-requests':
          setErrorMessage('Too many requests. Please try again later.');
          break;
        default:
          setErrorMessage('An unexpected error occurred. Please try again.');
      }
      
      setErrorOpen(true); // Open error dialog
    }
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    navigate("/user-dashboard/profile"); // Navigate after closing the success dialog
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  return (
    <div className="change-password-container">
      <form className="change-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="current-password">Current Password</label>
          <input
            type="password"
            id="current-password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {/* Success Dialog */}
      <Dialog open={successOpen} onClose={handleSuccessClose}>
        <DialogTitle>Password Changed Successfully!</DialogTitle>
        <DialogActions>
          <Button onClick={handleSuccessClose} color="primary">OK</Button>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={errorOpen} onClose={handleErrorClose}>
        <DialogTitle>{errorMessage}</DialogTitle> {/* Display the error message */}
        <DialogActions>
          <Button onClick={handleErrorClose} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangePassword;