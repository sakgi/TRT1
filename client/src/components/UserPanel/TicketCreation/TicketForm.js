// import React, { useState, useEffect } from 'react';
// import './TicketForm.css';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import { getAuth } from 'firebase/auth';

// function TicketForm() {
//   const navigate = useNavigate();
//   const auth = getAuth();
//   const user = auth.currentUser;

//   const [subject, setSubject] = useState('');
//   const [deviceType, setDeviceType] = useState('');
//   const [issueType, setIssueType] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [attachment, setAttachment] = useState(null);
//   const [description, setDescription] = useState('');
//   const [formErrors, setFormErrors] = useState('');

//   const [userData, setUserData] = useState({
//     employeeID: '',
//     userName: ''
//   });

//   useEffect(() => {
//     // Fetch user data from your backend or any API as necessary
//     const fetchUserData = async () => {
//       if (user) {
//         try {
//           const token = await user.getIdToken();  // Get the user's token for authentication
//           const response = await fetch('/api/userDetails', {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
//           const data = await response.json();
//           setUserData({
//             employeeID: data.employeeID,
//             userName: `${data.firstName} ${data.lastName}`
//           });
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       }
//     };
//     fetchUserData();
//   }, [user]);

//   const handleAttachmentChange = (e) => {
//     setAttachment(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const phoneRegex = /^[0-9]{10}$/;
//     if (!subject || !deviceType || !issueType || !attachment || !phoneRegex.test(phoneNumber)) {
//       setFormErrors('Please fill all mandatory fields and provide a valid 10-digit phone number.');
//       return;
//     }

//     setFormErrors('');

//     try {
//       // Create FormData object to include attachment and other fields
//       const formData = new FormData();
//       formData.append('subject', subject);
//       formData.append('deviceType', deviceType);
//       formData.append('issueType', issueType);
//       formData.append('phoneNumber', phoneNumber);
//       formData.append('description', description);
//       formData.append('attachment', attachment);

//       // Make a POST request to your backend
//       const token = await user.getIdToken();
//       const response = await fetch('/api/createTicket', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const result = await response.json();

//       if (response.ok) {
//         Swal.fire({
//           title: 'Success!',
//           html: `Your ticket has been raised successfully!<br><br>Your Ticket ID: <strong>${result.ticketID}</strong>`,
//           icon: 'success',
//           confirmButtonText: 'OK',
//         }).then(() => {
//           navigate('/user-dashboard/mytickets');
//         });
//       } else {
//         throw new Error(result.message || 'An error occurred while raising the ticket.');
//       }
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


import React, { useState } from 'react';
import './TicketForm.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore'; 
import { db, storage } from '../../../firebase/firebaseconfig'; // Adjust relative path accordingly

function TicketForm() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [issueType, setIssueType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [attachment, setAttachment] = useState(null);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(''); // New state for priority
  const [formErrors, setFormErrors] = useState('');

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const generateTicketID = () => {
    const currentYear = new Date().getFullYear().toString().slice(-2); 
    const currentMonth = (`0${new Date().getMonth() + 1}`).slice(-2); 
    const serialNumber = Math.floor(Math.random() * 1000); 
    const paddedSerial = String(serialNumber).padStart(3, '0'); 
    return `INSTAU${currentYear}${currentMonth}${paddedSerial}`;
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
      const ticketID = generateTicketID();
      const createdAt = new Date();

      // Uploading attachment to Firebase Storage
      const storageRef = ref(storage, `attachments/${ticketID}_${attachment.name}`);
      await uploadBytes(storageRef, attachment);
      const attachmentUrl = await getDownloadURL(storageRef);

      // Prepare the ticket data structure
      const ticketData = {
        subject,
        deviceType,
        issueType,
        description,
        phoneNumber,
        priority: priority || null, // Include priority, default to null if not set
        time: createdAt.toLocaleTimeString(),
        date: createdAt.toLocaleDateString(),
        status: 'Raised',
        assignedTo: null, // Saving assignedTo as null
        attachmentUrl // Saving file URL
      };

      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        // Saving ticket details in Firestore under the logged-in user's document
        const userDocRef = doc(db, 'users', currentUser.uid, 'TicketDetails', ticketID);
        await setDoc(userDocRef, ticketData);

        Swal.fire({
          title: 'Success!',
          html: `Your ticket has been raised successfully!<br><br>Your Ticket ID: <strong>${ticketID}</strong>`,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/user-dashboard/mytickets');
        });
      }
    } catch (error) {
      console.error('Error raising ticket:', error);
      setFormErrors('An error occurred while raising the ticket. Please try again.');
    }
  };

  return (
    <div className="new-ticket-container">
      <h2>Raise New Ticket</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
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

        {/* <div>
          <label>Priority: </label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div> */}

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

        {formErrors && <p className="error-message">{formErrors}</p>}

        <div className="button-group">
          <button type="submit" className="submit-button">Raise Ticket</button>
          <button type="button" className="cancel-button" onClick={() => navigate('/user-dashboard/mytickets')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default TicketForm;
