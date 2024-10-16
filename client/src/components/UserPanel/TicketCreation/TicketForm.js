// import React, { useState, useEffect } from 'react';
// import './TicketForm.css';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import { getFirestore, doc, setDoc, collection, getDoc, updateDoc, increment } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage functions

// function TicketForm() {
//   const navigate = useNavigate();
//   const db = getFirestore();
//   const auth = getAuth();
//   const storage = getStorage();  // Initialize Firebase Storage
//   const user = auth.currentUser;

//   const [subject, setSubject] = useState('');
//   const [deviceType, setDeviceType] = useState('');
//   const [issueType, setIssueType] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState(''); // Phone number state
//   const [attachment, setAttachment] = useState(null);
//   const [description, setDescription] = useState('');
//   const [formErrors, setFormErrors] = useState('');
  
//   const [userData, setUserData] = useState({
//     employeeID: '',
//     userName: ''
//   });

//   useEffect(() => {
//     // Fetch the user's Employee_ID, First_Name, and Last_Name from Firestore
//     const fetchUserData = async () => {
//       if (user) {
//         const userDocRef = doc(db, 'users', user.uid);  // Fetch user document based on UID
//         const userDoc = await getDoc(userDocRef);

//         if (userDoc.exists()) {
//           const userInfo = userDoc.data();
//           const fullName = `${userInfo.First_Name} ${userInfo.Last_Name}`;
//           setUserData({
//             employeeID: userInfo.Employee_ID,   // Use Employee_ID from user document
//             userName: fullName                 // Combine First_Name and Last_Name
//           });
//         } else {
//           console.log('No such document!');
//         }
//       }
//     };

//     fetchUserData();
//   }, [user, db]);

//   const handleAttachmentChange = (e) => {
//     setAttachment(e.target.files[0]);
//   };

//   const generateTicketID = async () => {
//     const currentYear = new Date().getFullYear().toString().slice(-2); // Last two digits of the year
//     const currentMonth = (`0${new Date().getMonth() + 1}`).slice(-2);  // Month padded to two digits

//     const counterRef = doc(db, 'TicketCounters', `${currentYear}-${currentMonth}`);
//     const counterDoc = await getDoc(counterRef);

//     let serialNumber = 1;

//     if (counterDoc.exists()) {
//       serialNumber = counterDoc.data().currentSerialNumber + 1; // Increment serial number
//       await updateDoc(counterRef, {
//         currentSerialNumber: increment(1)
//       });
//     } else {
//       await setDoc(counterRef, { currentSerialNumber: 1 });
//     }

//     const paddedSerial = String(serialNumber).padStart(3, '0'); // Pad serial number with leading zeros
//     return `INSTA${currentYear}${currentMonth}${paddedSerial}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const phoneRegex = /^[0-9]{10}$/; // Phone number validation rule
//     if (!subject || !deviceType || !issueType || !attachment || !phoneRegex.test(phoneNumber)) {
//       setFormErrors('Please fill all mandatory fields and provide a valid 10-digit phone number.');
//       return;
//     }

//     setFormErrors('');

//     try {
//       const ticketID = await generateTicketID(); // Generate the unique Ticket ID
//       const createdAt = new Date();

//       // Step 1: Upload the attachment to Firebase Storage
//       const storageRef = ref(storage, `ticket_attachments/${ticketID}/${attachment.name}`);
//       await uploadBytes(storageRef, attachment);

//       // Step 2: Get the download URL after file upload
//       const downloadURL = await getDownloadURL(storageRef);

//       // Step 3: Prepare the ticket data with the file's download URL
//       const ticketData = {
//         subject,
//         deviceType,
//         issueType,
//         description,
//         phoneNumber,  // Include phone number in ticket data
//         attachmentURL: downloadURL,  // Store the download URL instead of the file name
//         time: createdAt.toLocaleTimeString(),
//         date: createdAt.toLocaleDateString(),
//         status: 'Raised',
//         userName: userData.userName,  // Full name (First_Name + Last_Name)
//         employeeID: userData.employeeID  // Employee_ID from the user document
//       };

//       // Step 4: Save the ticket data in Firestore under the user's TicketDetails collection
//       const userTicketsRef = collection(db, `users/${user.uid}/TicketDetails`);
//       await setDoc(doc(userTicketsRef, ticketID), ticketData); // Save the ticket with generated Ticket ID as document ID

//       Swal.fire({
//         title: 'Success!',
//         html: `Your ticket has been raised successfully!<br><br>Your Ticket ID: <strong>${ticketID}</strong>`,
//         // text: `Your ticket has been raised successfully! Your Ticket ID: ${ticketID}`,
//         icon: 'success',
//         confirmButtonText: 'OK',
//       }).then(() => {
//         navigate('/user-dashboard/mytickets');
//       });
//     } catch (error) {
//       console.error('Error raising ticket:', error);
//       setFormErrors('An error occurred while raising the ticket. Please try again.');
//     }
//   };

//   return (
//     <div className="new-ticket-container-trt">
//       <h2>Raise New Ticket</h2>
//       <form onSubmit={handleSubmit} className="ticket-form-trt">
//         <div>
//           <label>Subject (Mandatory): </label>
//           <input
//             type="text"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Device Type (Mandatory): </label>
//           <select value={deviceType} onChange={(e) => setDeviceType(e.target.value)} required>
//             <option value="">Select Device Type</option>
//             <option value="Mobile">Mobile</option>
//             <option value="Laptop">Laptop</option>
//             <option value="Network">Network</option>
//             <option value="Printer">Printer</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label>Issue Type (Mandatory): </label>
//           <select value={issueType} onChange={(e) => setIssueType(e.target.value)} required>
//             <option value="">Select Issue Type</option>
//             <option value="Software">Software</option>
//             <option value="Hardware">Hardware</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label>Phone Number (Mandatory): </label>
//           <input
//             type="text"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             required
//             placeholder="10-digit phone number"
//           />
//         </div>

//         <div>
//           <label>Attachment (Mandatory): </label>
//           <input type="file" onChange={handleAttachmentChange} required />
//         </div>

//         <div>
//           <label>Description: </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows="4"
//           />
//         </div>

//         {formErrors && <p className="error-message-trt">{formErrors}</p>}

//         <div className="button-group-trt">
//           <button type="submit" className="submit-button-trt">Raise Ticket</button>
//           <button type="button" className="cancel-button-trt" onClick={() => navigate('/user-dashboard/mytickets')}>Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default TicketForm;


import React, { useState, useEffect } from 'react';
import './TicketForm.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function TicketForm() {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [subject, setSubject] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [issueType, setIssueType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [description, setDescription] = useState('');
  const [formErrors, setFormErrors] = useState('');

  const [userData, setUserData] = useState({
    employeeID: '',
    userName: ''
  });

  useEffect(() => {
    // Fetch user data from your backend or any API as necessary
    const fetchUserData = async () => {
      if (user) {
        try {
          const token = await user.getIdToken();  // Get the user's token for authentication
          const response = await fetch('/api/userDetails', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await response.json();
          setUserData({
            employeeID: data.employeeID,
            userName: `${data.firstName} ${data.lastName}`
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!subject || !deviceType || !issueType || !attachment || !phoneRegex.test(phoneNumber)) {
      setFormErrors('Please fill all mandatory fields and provide a valid 10-digit phone number.');
      return;
    }

    setFormErrors('');

    try {
      // Create FormData object to include attachment and other fields
      const formData = new FormData();
      formData.append('subject', subject);
      formData.append('deviceType', deviceType);
      formData.append('issueType', issueType);
      formData.append('phoneNumber', phoneNumber);
      formData.append('description', description);
      formData.append('attachment', attachment);

      // Make a POST request to your backend
      const token = await user.getIdToken();
      const response = await fetch('/api/createTicket', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          html: `Your ticket has been raised successfully!<br><br>Your Ticket ID: <strong>${result.ticketID}</strong>`,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/user-dashboard/mytickets');
        });
      } else {
        throw new Error(result.message || 'An error occurred while raising the ticket.');
      }
    } catch (error) {
      console.error('Error raising ticket:', error);
      setFormErrors('An error occurred while raising the ticket. Please try again.');
    }
  };

  return (
    <div className="new-ticket-container-trt">
      <h2>Raise New Ticket</h2>
      <form onSubmit={handleSubmit} className="ticket-form-trt">
        <div>
          <label>Subject (Mandatory): </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Device Type (Mandatory): </label>
          <select value={deviceType} onChange={(e) => setDeviceType(e.target.value)} required>
            <option value="">Select Device Type</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Network">Network</option>
            <option value="Printer">Printer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Issue Type (Mandatory): </label>
          <select value={issueType} onChange={(e) => setIssueType(e.target.value)} required>
            <option value="">Select Issue Type</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Phone Number (Mandatory): </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="10-digit phone number"
          />
        </div>

        <div>
          <label>Attachment (Mandatory): </label>
          <input type="file" onChange={handleAttachmentChange} required />
        </div>

        <div>
          <label>Description: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>

        {formErrors && <p className="error-message-trt">{formErrors}</p>}

        <div className="button-group-trt">
          <button type="submit" className="submit-button-trt">Raise Ticket</button>
          <button type="button" className="cancel-button-trt" onClick={() => navigate('/user-dashboard/mytickets')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default TicketForm;
