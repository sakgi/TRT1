// import React, { useState } from 'react';
// import './NewTicket.css';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// function NewTicket() {
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [subject, setSubject] = useState('');
//   const [onBehalfOf, setOnBehalfOf] = useState('Self');
//   const [employeeId, setEmployeeId] = useState('');
//   const [deviceType, setDeviceType] = useState('');
//   const [issueType, setIssueType] = useState('');
//   const [attachment, setAttachment] = useState(null);
//   const [description, setDescription] = useState('');
//   const [formErrors, setFormErrors] = useState('');

//   const handleAttachmentChange = (e) => {
//     setAttachment(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!subject || !deviceType || !issueType || !attachment || (onBehalfOf === 'Other Employee' && !employeeId)) {
//       setFormErrors('Please fill all the mandatory fields.');
//     } else {
//       setFormErrors('');
//       console.log({
//         subject,
//         onBehalfOf,
//         employeeId: onBehalfOf === 'Other Employee' ? employeeId : 'Self',
//         deviceType,
//         issueType,
//         attachment,
//         description
//       });

//       // Show SweetAlert
//       Swal.fire({
//         title: 'Success!',
//         text: 'Your ticket has been raised successfully!',
//         icon: 'success',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         navigate('/admin-tickets/tickets'); // Replace with your desired route
//       });
//     }
//   };

//   const handleCancel = () => {
//     navigate('/admin-tickets/tickets'); // Replace with your desired route
//   };

//   return (
//     <div className="new-ticket-container">
//       <h2>Raise Ticket</h2>
//       <form onSubmit={handleSubmit} className="ticket-form">
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
//           <label>On Behalf Of (Mandatory): </label>
//           <select value={onBehalfOf} onChange={(e) => setOnBehalfOf(e.target.value)}>
//             <option value="Self">Self</option>
//             <option value="Other Employee">Other Employee</option>
//           </select>
//         </div>

//         {onBehalfOf === 'Other Employee' && (
//           <div>
//             <label>Enter Employee-ID: </label>
//             <input
//               type="text"
//               value={employeeId}
//               onChange={(e) => setEmployeeId(e.target.value)}
//               required={onBehalfOf === 'Other Employee'}
//             />
//           </div>
//         )}

//         <div>
//           <label>Device Type (Mandatory): </label>
//           <select value={deviceType} onChange={(e) => setDeviceType(e.target.value)} required>
//             <option value="">Select Device Type</option>
//             <option value="Mobile">Mobile</option>
//             <option value="Laptop">Laptop</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label>Issue Type (Mandatory): </label>
//           <select value={issueType} onChange={(e) => setIssueType(e.target.value)} required>
//             <option value="">Select Issue Type</option>
//             <option value="Software">Software</option>
//             <option value="Hardware">Hardware</option>
//           </select>
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

//         {formErrors && <p style={{ color: 'red' }}>{formErrors}</p>}

//         <div>
//         <button type="button" onClick={handleCancel}>Cancel</button> {/* Cancel Button */}
//           <button type="submit">Raise Ticket</button>
          
//         </div>
//       </form>
//     </div>
//   );
// }

// export default NewTicket;



// import React, { useState } from 'react';
// import './NewTicket.css';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// function NewTicket() {
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [subject, setSubject] = useState('');
//   const [onBehalfOf, setOnBehalfOf] = useState('Self');
//   const [employeeId, setEmployeeId] = useState('');
//   const [deviceType, setDeviceType] = useState('');
//   const [issueType, setIssueType] = useState('');
//   const [attachment, setAttachment] = useState(null);
//   const [description, setDescription] = useState('');
//   const [formErrors, setFormErrors] = useState('');

//   const handleAttachmentChange = (e) => {
//     setAttachment(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!subject || !deviceType || !issueType || !attachment || (onBehalfOf === 'Other Employee' && !employeeId)) {
//       setFormErrors('Please fill all the mandatory fields.');
//     } else {
//       setFormErrors('');
//       console.log({
//         subject,
//         onBehalfOf,
//         employeeId: onBehalfOf === 'Other Employee' ? employeeId : 'Self',
//         deviceType,
//         issueType,
//         attachment,
//         description
//       });

//       // Show SweetAlert
//       Swal.fire({
//         title: 'Success!',
//         text: 'Your ticket has been raised successfully!',
//         icon: 'success',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         navigate('/admin-tickets/tickets'); // Replace with your desired route
//       });
//     }
//   };

//   const handleCancel = () => {
//     navigate('/admin-tickets/tickets'); // Replace with your desired route
//   };

//   return (
//     <div className="new-ticket-container">
//       <h2>Raise Ticket</h2>
//       <form onSubmit={handleSubmit} className="ticket-form">
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
//           <label>On Behalf Of (Mandatory): </label>
//           <select value={onBehalfOf} onChange={(e) => setOnBehalfOf(e.target.value)}>
//             <option value="Self">Self</option>
//             <option value="Other Employee">Other Employee</option>
//           </select>
//         </div>

//         {onBehalfOf === 'Other Employee' && (
//           <div>
//             <label>Enter Employee-ID: </label>
//             <input
//               type="text"
//               value={employeeId}
//               onChange={(e) => setEmployeeId(e.target.value)}
//               required={onBehalfOf === 'Other Employee'}
//             />
//           </div>
//         )}

//         <div>
//           <label>Device Type (Mandatory): </label>
//           <select value={deviceType} onChange={(e) => setDeviceType(e.target.value)} required>
//             <option value="">Select Device Type</option>
//             <option value="Mobile">Mobile</option>
//             <option value="Laptop">Laptop</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label>Issue Type (Mandatory): </label>
//           <select value={issueType} onChange={(e) => setIssueType(e.target.value)} required>
//             <option value="">Select Issue Type</option>
//             <option value="Software">Software</option>
//             <option value="Hardware">Hardware</option>
//           </select>
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

//         {formErrors && <p style={{ color: 'red' }}>{formErrors}</p>}

//         <div>
//         <button type="button" onClick={handleCancel}>Cancel</button> {/* Cancel Button */}
//           <button type="submit">Raise Ticket</button>
          
//         </div>
//       </form>
//     </div>
//   );
// }

// export default NewTicket;




import React, { useState } from 'react';
import './NewTicket.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// Firebase Imports (Modular SDK)
import { getAuth } from 'firebase/auth';

function NewTicket() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [onBehalfOf, setOnBehalfOf] = useState('self');
  const [employeeId, setEmployeeId] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [issueType, setIssueType] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [description, setDescription] = useState('');
  const [formErrors, setFormErrors] = useState('');

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for mandatory fields
    if (!subject || !deviceType || !issueType || !attachment || (onBehalfOf === 'Other Employee' && !employeeId)) {
      setFormErrors('Please fill all the mandatory fields.');
      return;
    }

    // Clear form errors if all mandatory fields are filled
    setFormErrors('');

    // Firebase Auth to get the current user's ID token
    const auth = getAuth(); // Get the Firebase Auth instance
    auth.currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
      // Prepare form data
      const formData = new FormData();
      formData.append('subject', subject);
      formData.append('onBehalfOf', onBehalfOf);
      formData.append('employeeId', onBehalfOf === 'Other Employee' ? employeeId : 'self');
      formData.append('deviceType', deviceType);
      formData.append('issueType', issueType);
      formData.append('attachment', attachment);
      formData.append('description', description);

      // Make the request to the backend
      fetch('http://localhost:1760/admin/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}` // Include the Firebase ID token in the Authorization header
        },
        body: formData // Send the form data
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Ticket created successfully') {
            Swal.fire({
              title: 'Success!',
              text: 'Your ticket has been raised successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              navigate('/AdminDashboard/tickets'); // Navigate to the desired route after success
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: data.message || 'Something went wrong!',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        })
        .catch((error) => {
          console.error('Error submitting ticket:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to raise ticket.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }).catch((error) => {
      console.error('Error getting Firebase ID token:', error);
      Swal.fire({
        title: 'Authentication Error',
        text: 'Failed to retrieve authentication token. Please login again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  };

  const handleCancel = () => {
    navigate('/admin-tickets/tickets');
  };

  return (
    <div className="new-ticket-container">
      <h2>Raise Ticket</h2>
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
          <label>On Behalf Of (Mandatory): </label>
          <select value={onBehalfOf} onChange={(e) => setOnBehalfOf(e.target.value)}>
            <option value="self">Self</option>
            <option value="other Employee">Other Employee</option>
          </select>
        </div>

        {onBehalfOf === 'Other Employee' && (
          <div>
            <label>Enter Employee-ID: </label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required={onBehalfOf === 'Other Employee'}
            />
          </div>
        )}

        <div>
          <label>Device Type (Mandatory): </label>
          <select value={deviceType} onChange={(e) => setDeviceType(e.target.value)} required>
            <option value="">Select Device Type</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Issue Type (Mandatory): </label>
          <select value={issueType} onChange={(e) => setIssueType(e.target.value)} required>
            <option value="">Select Issue Type</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
          </select>
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

        {formErrors && <p style={{ color: 'red' }}>{formErrors}</p>}

        <div>
          <button type="button" onClick={handleCancel}>Cancel</button>
          <button type="submit">Raise Ticket</button>
        </div>
      </form>
    </div>
  );
}

export default NewTicket;