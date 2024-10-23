// // import React, { useState } from 'react';
// // import './TicketDetails.css';
// // import '@fortawesome/fontawesome-free/css/all.min.css';
// // import ReactQuill from 'react-quill';
// // import 'react-quill/dist/quill.snow.css';

// // function TicketDetail() {
// //   const [status, setStatus] = useState('Open');
// //   const [priority, setPriority] = useState('Low');
// //   const [action, setAction] = useState('Open');
// //   const [replyText, setReplyText] = useState('');
// //   const [attachment, setAttachment] = useState(null);
// //   const [isAssigningEngineer, setIsAssigningEngineer] = useState(false);
// //   const [selectedEngineer, setSelectedEngineer] = useState('Unassigned');

// //   const handleFileChange = (e) => {
// //     setAttachment(e.target.files[0]);
// //   };

// //   const handleReplySubmit = () => {
// //     console.log('Reply Text:', replyText);
// //     console.log('Attachment:', attachment?.name);
// //     setReplyText('');
// //     setAttachment(null);
// //   };

// //   const modules = {
// //     toolbar: false,
// //   };

// //   const handleAssignEngineerClick = () => {
// //     setIsAssigningEngineer(true);
// //   };

// //   const handleEngineerSelect = (engineer) => {
// //     setSelectedEngineer(engineer);
// //     setIsAssigningEngineer(false);
// //   };

// //   return (
// //     <div className="ticket-container">
// //       <div className="ticket-left">
// //         <h2>Ticket Details</h2>
// //         <p><strong>Subject:</strong> Bluetooth not working</p>
// //         <p><strong>Device Type:</strong> Laptop</p>
// //         <p><strong>Issue Type:</strong> Hardware</p>
// //         <p><strong>Description:</strong> Bluetooth not detecting devices</p>

// //         <div className="reply-section-fixed">
// //           <h3>Reply</h3>

// //           <div className="reply-toolbar">
// //             <button onClick={() => setReplyText(replyText + '**bold**')}>B</button>
// //             <button onClick={() => setReplyText(replyText + '*italic*')}>I</button>
// //             <button onClick={() => setReplyText(replyText + '__underline__')}>U</button>

// //             <label htmlFor="file-input">
// //               <i className="fas fa-paperclip" style={{ cursor: 'pointer' }}></i>
// //             </label>
// //             <input 
// //               id="file-input"
// //               type="file"
// //               className="file-input"
// //               onChange={handleFileChange}
// //               title="Attach files"
// //               style={{ display: 'none' }} 
// //             />

// //             {attachment && (
// //               <span className="file-name">{attachment.name}</span>
// //             )}
// //           </div>

// //           <div className="reply-box">
// //             <ReactQuill
// //               theme="snow"
// //               value={replyText}
// //               onChange={setReplyText}
// //               placeholder="Add a reply..."
// //               modules={modules}
// //               formats={['header', 'bold', 'italic', 'underline', 'list', 'link', 'image']}
// //             />
// //           </div>

// //           <button className="send-btn" onClick={handleReplySubmit}>Send</button>
// //         </div>
// //       </div>

// //       <div className="ticket-right">
// //         <h2>Ticket Metadata</h2>
// //         <p><strong>Created Date:</strong> 20 Aug 2024</p>
// //         <p><strong>Last Update Date:</strong> 21 Aug 2024</p>

// //         <div className="ticket-priority">
// //           <label htmlFor="priority"><strong>Priority:</strong></label>
// //           <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
// //             <option value="High">High</option>
// //             <option value="Medium">Medium</option>
// //             <option value="Low">Low</option>
// //           </select>
// //         </div>

// //         <div className="ticket-action">
// //           <label htmlFor="action"><strong>Action:</strong></label>
// //           <select id="action" value={action} onChange={(e) => setAction(e.target.value)}>
// //             <option value="Open">Open</option>
// //             <option value="Closed">Closed</option>
// //             <option value="Pending">Pending</option>
// //           </select>
// //         </div>

// //         <div className="responsibility-section">
// //           <p><strong>Responsibility:</strong></p>
// //           {selectedEngineer === 'Unassigned' ? (
// //             <>
// //               <button className="assign-btn" onClick={handleAssignEngineerClick}>Assign Engineer</button>
// //               {isAssigningEngineer && (
// //                 <select
// //                   className="engineer-dropdown"
// //                   value={selectedEngineer}
// //                   onChange={(e) => handleEngineerSelect(e.target.value)}
// //                 >
// //                   <option value="abc1">abc1</option>
// //                   <option value="abc2">abc2</option>
// //                   <option value="abc3">abc3</option>
// //                 </select>
// //               )}
// //             </>
// //           ) : (
// //             <p>{selectedEngineer}</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default TicketDetail;


// import React, { useState, useEffect } from 'react';
// import './TicketDetails.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// function TicketDetail() {
//   const [status, setStatus] = useState('Open');
//   const [priority, setPriority] = useState('Low');
//   const [action, setAction] = useState('Open');
//   const [replyText, setReplyText] = useState('');
//   const [attachment, setAttachment] = useState(null);
//   const [isAssigningEngineer, setIsAssigningEngineer] = useState(false);
//   const [selectedEngineer, setSelectedEngineer] = useState('Unassigned');
//   const [tickets, setTickets] = useState([]); // State to store fetched tickets
//   const [loading, setLoading] = useState(true); // Loading state

//   // Function to handle file attachment
//   const handleFileChange = (e) => {
//     setAttachment(e.target.files[0]);
//   };

//   // Function to handle reply submission
//   const handleReplySubmit = () => {
//     console.log('Reply Text:', replyText);
//     console.log('Attachment:', attachment?.name);
//     setReplyText('');
//     setAttachment(null);
//   };

//   const modules = {
//     toolbar: false,
//   };

//   // Function to toggle engineer assignment dropdown
//   const handleAssignEngineerClick = () => {
//     setIsAssigningEngineer(true);
//   };

//   // Function to select an engineer
//   const handleEngineerSelect = (engineer) => {
//     setSelectedEngineer(engineer);
//     setIsAssigningEngineer(false);
//   };

//   // Function to fetch tickets assigned to the logged-in user
//   const fetchTickets = async () => {
//     try {
//       const response = await fetch('/api/assigned-tickets', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
//         },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setTickets(data); // Store tickets in state
//         setLoading(false); // Set loading to false
//       } else {
//         console.error('Error fetching tickets:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching tickets:', error);
//     }
//   };

//   // useEffect hook to fetch tickets when the component loads
//   useEffect(() => {
//     fetchTickets(); // Call the function to fetch assigned tickets
//   }, []);

//   if (loading) {
//     return <div>Loading tickets...</div>;
//   }

//   return (
//     <div className="ticket-container">
//       <div className="ticket-left">
//         <h2>Assigned Tickets</h2>
//         {tickets.length === 0 ? (
//           <p>No tickets assigned to you.</p>
//         ) : (
//           tickets.map((ticket) => (
//             <div key={ticket.id}>
//               <p><strong>Subject:</strong> {ticket.subject}</p>
//               <p><strong>Device Type:</strong> {ticket.deviceType}</p>
//               <p><strong>Issue Type:</strong> {ticket.issueType}</p>
//               <p><strong>Description:</strong> {ticket.description}</p>
//             </div>
//           ))
//         )}

//         <div className="reply-section-fixed">
//           <h3>Reply</h3>

//           <div className="reply-toolbar">
//             <button onClick={() => setReplyText(replyText + '**bold**')}>B</button>
//             <button onClick={() => setReplyText(replyText + '*italic*')}>I</button>
//             <button onClick={() => setReplyText(replyText + '__underline__')}>U</button>

//             <label htmlFor="file-input">
//               <i className="fas fa-paperclip" style={{ cursor: 'pointer' }}></i>
//             </label>
//             <input 
//               id="file-input"
//               type="file"
//               className="file-input"
//               onChange={handleFileChange}
//               title="Attach files"
//               style={{ display: 'none' }} 
//             />

//             {attachment && (
//               <span className="file-name">{attachment.name}</span>
//             )}
//           </div>

//           <div className="reply-box">
//             <ReactQuill
//               theme="snow"
//               value={replyText}
//               onChange={setReplyText}
//               placeholder="Add a reply..."
//               modules={modules}
//               formats={['header', 'bold', 'italic', 'underline', 'list', 'link', 'image']}
//             />
//           </div>

//           <button className="send-btn" onClick={handleReplySubmit}>Send</button>
//         </div>
//       </div>

//       <div className="ticket-right">
//         <h2>Ticket Metadata</h2>
//         <p><strong>Created Date:</strong> 20 Aug 2024</p>
//         <p><strong>Last Update Date:</strong> 21 Aug 2024</p>

//         <div className="ticket-priority">
//           <label htmlFor="priority"><strong>Priority:</strong></label>
//           <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//         </div>

//         <div className="ticket-action">
//           <label htmlFor="action"><strong>Action:</strong></label>
//           <select id="action" value={action} onChange={(e) => setAction(e.target.value)}>
//             <option value="Open">Open</option>
//             <option value="Closed">Closed</option>
//             <option value="Pending">Pending</option>
//           </select>
//         </div>

//         <div className="responsibility-section">
//           <p><strong>Responsibility:</strong></p>
//           {selectedEngineer === 'Unassigned' ? (
//             <>
//               <button className="assign-btn" onClick={handleAssignEngineerClick}>Assign Engineer</button>
//               {isAssigningEngineer && (
//                 <select
//                   className="engineer-dropdown"
//                   value={selectedEngineer}
//                   onChange={(e) => handleEngineerSelect(e.target.value)}
//                 >
//                   <option value="abc1">abc1</option>
//                   <option value="abc2">abc2</option>
//                   <option value="abc3">abc3</option>
//                 </select>
//               )}
//             </>
//           ) : (
//             <p>{selectedEngineer}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TicketDetail;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase/firebaseconfig'; // Adjust the path if necessary
import { doc, getDoc, updateDoc, collection, getDocs, query, orderBy, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Container, Paper, Typography, Button, Divider, Select, MenuItem, TextField, Grid } from '@mui/material';
import SweetAlert from 'sweetalert2';
import './TicketDetails.css';

const TicketDetail = () => {
  const { ticketId } = useParams(); // Get ticketId from URL
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [admins, setAdmins] = useState([]); // State for storing Admins
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [attachment, setAttachment] = useState(null); // State for managing the attachment
  const [showAdminList, setShowAdminList] = useState(false); // State to toggle admin list display

  // State for chat functionality
  const [messageInput, setMessageInput] = useState(''); // State for chat input
  const [messages, setMessages] = useState([]); // State to store chat messages

  useEffect(() => {
    const fetchTicketDetails = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError('User is not authenticated');
        setLoading(false);
        return;
      }

      const docRef = doc(db, `users/${user.uid}/TicketDetails/${ticketId}`);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTicketDetails({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Ticket not found.');
        }
      } catch (err) {
        console.log(`err: ${err}`);
        setError('Error fetching ticket details.');
      } finally {
        setLoading(false);
      }
    };

    const fetchAdmins = async () => {
      const usersRef = collection(db, 'users');
      const userDocs = await getDocs(usersRef);
      const adminList = userDocs.docs
        .filter(doc => doc.data().role === 'Admin') // Filter for Admin role
        .map(doc => ({ 
          id: doc.id, 
          name: `${doc.data().First_Name} ${doc.data().Last_Name}` // Combine first and last name
        }));
      setAdmins(adminList); // Save admins to state
    };

    const fetchMessages = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      // Update to use the ChatSection collection
      const messagesRef = collection(db, `users/${user.uid}/TicketDetails/${ticketId}/ChatSection`);
      const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc')); // Get messages in order
      const messagesSnap = await getDocs(messagesQuery);

      const fetchedMessages = messagesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(fetchedMessages);
    };

    fetchTicketDetails();
    fetchAdmins(); // Fetch admins on component mount
    fetchMessages(); // Fetch messages on component mount
  }, [ticketId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachment(file); // Set the selected file to the state
    }
  };


  const handlePriorityChange = async (event) => {
    const newPriority = event.target.value;
    setPriority(newPriority);
    await updateDoc(doc(db, `users/${getAuth().currentUser.uid}/TicketDetails/${ticketId}`), {
      priority: newPriority,
    });
    SweetAlert.fire('Success', `You have selected ${newPriority} priority`, 'success');
  };

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    await updateDoc(doc(db, `users/${getAuth().currentUser.uid}/TicketDetails/${ticketId}`), {
      status: newStatus,
    });
    SweetAlert.fire('Success', `Status updated to ${newStatus}`, 'success');
  };

  const handleAdminSelect = async (adminName) => {
    const user = getAuth().currentUser;
    if (user) {
      await updateDoc(doc(db, `users/${user.uid}/TicketDetails/${ticketId}`), {
        assignedTo: adminName, // Assign selected Admin to the ticket
      });
      setShowAdminList(false); // Hide admin list after selection
      SweetAlert.fire('Success', `Assigned to ${adminName}`, 'success');
    }
  };

  // Chat message handler
  const handleSendMessage = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user || !messageInput) return;

    const newMessage = {
      senderId: user.uid,
      senderName: user.displayName || 'Anonymous', // Use display name or anonymous if not available
      message: messageInput,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, `users/${user.uid}/TicketDetails/${ticketId}/ChatSection`), newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]); // Add message to the state
      setMessageInput(''); // Clear input
    } catch (err) {
      SweetAlert.fire('Error', 'Could not send message', 'error');
    }
  };

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" className="ticket-details-container">
      <Paper elevation={4} className="ticket-details-paper">
        <Typography variant="h4" className="ticket-title" gutterBottom>
          {ticketDetails.subject}
        </Typography>
        <Divider className="divider-spacing" />
        <div className="ticket-details-content">
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6">Description:</Typography>
              <Typography className="ticket-description">{ticketDetails.description}</Typography>

              <Divider className="divider-spacing" />

              {/* Chat Message Section */}
              <div style={{ marginTop: '20px' }}>
                <Typography variant="h6">Messages:</Typography>
                <div className="message-list">
                  {messages.map(msg => (
                    <div key={msg.id} className="message-item">
                      <strong>{msg.senderName}</strong>: {msg.message}
                    </div>
                  ))}
                </div>
                <TextField
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                  placeholder="Enter your message..."
                  className="reply-input"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="send-button"
                  onClick={handleSendMessage}
                >
                  Send
                </Button>
              </div>

              <div style={{ marginTop: '20px' }}>
                <input 
                  id="file-input"
                  type="file"
                  className="file-input"
                  onChange={handleFileChange}
                  title="Attach files"
                  style={{ display: 'none' }} 
                />

                <label htmlFor="file-input">
                  <Button variant="contained" component="span">Attach File</Button>
                </label>
                {attachment && (
                  <span className="file-name">{attachment.name}</span>
                )}
              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper className="ticket-info">
                <Typography variant="h6">Ticket Info</Typography>
                <Divider className="divider-spacing" />
                <Typography><strong>Device Type:</strong> {ticketDetails.deviceType || 'N/A'}</Typography>
                <Typography><strong>Ticket ID:</strong> {ticketDetails.id}</Typography>
                <Typography>
                  <strong>Priority:</strong>
                  <Select
                    value={priority || ticketDetails.priority || 'Medium'} // Default to Medium if not set
                    onChange={handlePriorityChange}
                    variant="outlined"
                  >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </Select>
                </Typography>
                <Typography>
                  <strong>Status:</strong>
                  <Select
                    value={status || ticketDetails.status || 'Raised'} // Default to Raised if not set
                    onChange={handleStatusChange}
                    variant="outlined"
                  >
                    <MenuItem value="Raised">Raised</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setShowAdminList(!showAdminList)}
                >
                  Assign To Admin
                </Button>
                {showAdminList && (
                  <div className="admin-list">
                    {admins.map(admin => (
                      <Button
                        key={admin.id}
                        onClick={() => handleAdminSelect(admin.name)}
                        variant="outlined"
                      >
                        {admin.name}
                      </Button>
                    ))}
                  </div>
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </Container>
  );
};

export default TicketDetail;