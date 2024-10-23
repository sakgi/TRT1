// import React, { useState } from 'react';
// import './ViewTicketDetails.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Quill styles

// function TicketDetail() {
//   // Static ticket details (these can be hardcoded or fetched from an API if needed)
//   const ticket = {
//     id: 1,
//     requester: 'Vaishnavi',
//     subject: 'Bluetooth not working',
//     deviceType: 'Laptop',
//     issueType: 'Hardware',
//     engineer: 'Unassigned',
//     status: 'Open',
//     time: '20 Aug 2024',
//     priority: 'High',
//     lastUpdate: '22 Aug 2024',
//     attachment: 'bluetooth_issue.pdf',
//     description: 'Bluetooth is not working after the recent update.',
//   };

//   const [replyText, setReplyText] = useState('');
//   const [attachment, setAttachment] = useState(ticket.attachment || null); // Store the file here

//   const handleFileChange = (e) => {
//     setAttachment(e.target.files[0]);
//   };

//   const handleReplySubmit = () => {
//     console.log('Reply Text:', replyText);
//     console.log('Attachment:', attachment?.name);
//     setReplyText('');
//     setAttachment(null);
//   };

//   const modules = {
//     toolbar: false, // Disable default toolbar
//   };

//   return (
//     <div className="ticket-container">
//       <div className="ticket-left">
//         <h2>Ticket Details</h2>
//         <p><strong>Subject:</strong> {ticket.subject}</p>
//         <p><strong>Device Type:</strong> {ticket.deviceType}</p>
//         <p><strong>Issue Type:</strong> {ticket.issueType}</p>
//         <p><strong>Description:</strong> {ticket.description}</p>

//         {/* Attachment display */}
//         {ticket.attachment && (
//           <p>
//             <strong>Attachment:</strong> 
//             <a href={`/${ticket.attachment}`} download>{ticket.attachment}</a>
//           </p>
//         )}

//         {/* Reply Section */}
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
//               style={{ display: 'none' }}  // Hide the actual input
//             />

//             {/* Display the file name next to the paperclip icon */}
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
//               modules={modules} // Use the defined modules
//               formats={['header', 'bold', 'italic', 'underline', 'list', 'link', 'image']} // Define formats
//             />
//           </div>

//           {/* Submit Button */}
//           <button className="send-btn" onClick={handleReplySubmit}>Send</button>
//         </div>
//       </div>

//       <div className="ticket-right">
//         <h2>Ticket Metadata</h2>
//         <br></br>
//         <br></br>
        
//         <p><strong>Ticket ID:</strong> {ticket.id}</p>
//         <p><strong>Created Date:</strong> {ticket.time}</p>
//         <p><strong>Last Update:</strong> {ticket.lastUpdate}</p>
//         <p><strong>Priority:</strong> {ticket.priority}</p>
//         <p><strong>Status:</strong> {ticket.status}</p>
//         <p><strong>Engineer:</strong> {ticket.engineer}</p>
//       </div>
//     </div>
//   );
// }

// export default TicketDetail;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
// import Sidebar from '../Sidebar/Sidebar';
import './ViewTicketDetails.css';
import { Attachment } from '@mui/icons-material';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState(''); // Input message
  const [chatMessages, setChatMessages] = useState([]); // Store chat messages
  const [sendersMap, setSendersMap] = useState({}); // Store sender details (First_Name, Last_Name)

  useEffect(() => {
    const fetchTicketDetails = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError('User is not authenticated');
        setLoading(false);
        return;
      }

      const db = getFirestore();
      const docRef = doc(db, `users/${user.uid}/TicketDetails/${ticketId}`);

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTicket({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Ticket not found.');
        }
      } catch (err) {
        setError('Error fetching ticket details.');
        console.error("Error fetching ticket details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  // Fetch chat messages in real-time from Firestore
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const db = getFirestore();
    const messagesRef = collection(db, `users/${user.uid}/TicketDetails/${ticketId}/ChatSection`);
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    // Listen for real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [ticketId]);

  // Function to fetch the First_Name and Last_Name of a sender
  const fetchSenderDetails = async (senderId) => {
    if (sendersMap[senderId]) {
      return sendersMap[senderId]; // Return cached sender details
    }

    const db = getFirestore();
    const userRef = doc(db, `users/${senderId}`);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const { First_Name, Last_Name } = userDoc.data();
        const senderDetails = `${First_Name} ${Last_Name}`;
        setSendersMap((prevMap) => ({ ...prevMap, [senderId]: senderDetails })); // Cache sender details
        return senderDetails;
      } else {
        return 'Unknown Sender';
      }
    } catch (err) {
      console.error("Error fetching sender details:", err);
      return 'Unknown Sender';
    }
  };

  // Send message to Firestore
  const sendMessage = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!newMessage.trim()) return; // Prevent empty messages

    try {
      const db = getFirestore();
      const messageData = {
        sender: user.uid,
        message: newMessage,
        timestamp: Timestamp.now(),
      };

      await addDoc(collection(db, `users/${user.uid}/TicketDetails/${ticketId}/ChatSection`), messageData);
      setNewMessage(''); // Clear input field after sending message
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const getPriorityColor = (priority) => {
    if (!priority) return 'default';
    switch (priority.toLowerCase()) {
      case 'high': return 'error'; 
      case 'medium': return 'warning';
      case 'low': return 'success'; 
      default: return 'default';
    }
  };

  const toggleSidebar = () =>
     setIsSidebarOpen(!isSidebarOpen);

  // Fetch sender details when chatMessages change
  useEffect(() => {
    const fetchAllSenderDetails = async () => {
      const senderPromises = chatMessages.map(async (chat) => {
        const senderDetails = await fetchSenderDetails(chat.sender);
        return { [chat.sender]: senderDetails };
      });

      const senderResults = await Promise.all(senderPromises);
      const newSendersMap = senderResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setSendersMap((prevMap) => ({ ...prevMap, ...newSendersMap }));
    };

    if (chatMessages.length > 0) {
      fetchAllSenderDetails();
    }
  }, [chatMessages]);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" className="ticket-details-container">
      {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}

      <div className={`ticket-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Paper elevation={4} className="ticket-details-paper">
          <Typography variant="h4" className="ticket-title" gutterBottom>
            {ticket.subject}
          </Typography>

          <Divider className="divider-spacing" />

          <div className="ticket-details-content">
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6">Description:</Typography>
                <Typography className="ticket-description">{ticket.description}</Typography>

                <Divider className="divider-spacing" />

                {/* Chat Section */}
                <div style={{ marginTop: '50px' }}>
                  <Typography variant="h6">Chat Section</Typography>
                  
                  {/* List of Chat Messages */}
                  <List>
                    {chatMessages.map((chat) => (
                      <ListItem key={chat.id}>
                        <ListItemText
                          primary={sendersMap[chat.sender] || 'Fetching...'}
                          secondary={`${chat.message} - ${new Date(chat.timestamp.seconds * 1000).toLocaleString()}`} 
                        />
                      </ListItem>
                    ))}
                  </List>

                  {/* Input Field for Sending a New Message */}
                  <TextField
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter Message..."
                    className="reply-input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />

                  {/* Send Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    className="send-button"
                    onClick={sendMessage}
                    style={{ marginTop: '10px' }}
                  >
                    Send
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Ticket Info */}
                <Paper className="ticket-info">
                  <Typography variant="h6">Ticket Info</Typography>
                  <Divider className="divider-spacing" />

                  <Typography><strong>Device Type:</strong> {ticket.deviceType || 'N/A'}</Typography>
                  <Typography><strong>Ticket ID:</strong> {ticket.id}</Typography>
                  <Typography>
                    <strong>Status:</strong> <Chip label={ticket.status || 'N/A'} color="primary" size="small" />
                  </Typography>
                  <Typography>
                    <strong>Priority:</strong>
                    <Chip label={ticket.priority || 'N/A'} color={getPriorityColor(ticket.priority)} size="small" />
                  </Typography>
                  <Typography><strong>Issue Type:</strong> {ticket.issueType || 'N/A'}</Typography>
                  <Typography>
                    <Attachment fontSize="small" /> <strong>Attached File:</strong>
                    {ticket.attachmentUrl ? (
                      <a href={ticket.attachmentUrl} target="_blank" rel="noopener noreferrer">
                        View Attachment
                      </a>
                    ) : 'No Attachment'}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </Container>
  );
};

export default TicketDetails;