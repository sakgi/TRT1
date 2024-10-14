import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/ViewTicketDetails/ViewTicketDetails.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill styles

function TicketDetail() {
  const { id } = useParams();

  const tickets = {
    1: { id: 1, requester: 'Vaishnavi', subject: 'Bluetooth not working', deviceType: 'Laptop', issueType: 'Hardware', engineer: 'Unassigned', status: 'Open', time: '20 Aug 2024', priority: 'High', lastUpdate: '22 Aug 2024', attachment: 'bluetooth_issue.pdf', description: 'Bluetooth is not working after the recent update.' },
    2: { id: 2, requester: 'Parth', subject: 'Shutdown Problem', deviceType: 'Desktop', issueType: 'Software', engineer: 'Unassigned', status: 'Closed', time: '23 Aug 2024', priority: 'Medium', lastUpdate: '25 Aug 2024', attachment: 'shutdown_issue.png', description: 'System shuts down randomly during work.' },
    3: { id: 3, requester: 'John', subject: 'Display issue', deviceType: 'Monitor', issueType: 'Hardware', engineer: 'Unassigned', status: 'Pending', time: '24 Aug 2024', priority: 'Low', lastUpdate: '26 Aug 2024', attachment: 'display_issue.jpg', description: 'The monitor flickers occasionally.' },
  };

  const ticket = tickets[id];

  const [replyText, setReplyText] = useState('');
  const [attachment, setAttachment] = useState(ticket.attachment || null); // Store the file here

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleReplySubmit = () => {
    console.log('Reply Text:', replyText);
    console.log('Attachment:', attachment?.name);
    setReplyText('');
    setAttachment(null);
  };

  const modules = {
    toolbar: false, // Disable default toolbar
  };

  if (!ticket) {
    return <div className="ticket-container"><p>Ticket not found.</p></div>;
  }

  return (
    <div className="ticket-container">
      <div className="ticket-left">
        <h2>Ticket Details</h2>
        <p><strong>Subject:</strong> {ticket.subject}</p>
        <p><strong>Device Type:</strong> {ticket.deviceType}</p>
        <p><strong>Issue Type:</strong> {ticket.issueType}</p>
        <p><strong>Description:</strong> {ticket.description}</p>
        
        {/* Attachment display */}
        {ticket.attachment && (
          <p>
            <strong>Attachment:</strong> 
            <a href={`/${ticket.attachment}`} download>{ticket.attachment}</a>
          </p>
        )}

        {/* Reply Section */}
        <div className="reply-section-fixed">
          <h3>Reply</h3>

          <div className="reply-toolbar">
            <button onClick={() => setReplyText(replyText + '**bold**')}>B</button>
            <button onClick={() => setReplyText(replyText + '*italic*')}>I</button>
            <button onClick={() => setReplyText(replyText + '__underline__')}>U</button>

            <label htmlFor="file-input">
              <i className="fas fa-paperclip" style={{ cursor: 'pointer' }}></i>
            </label>
            <input 
              id="file-input"
              type="file"
              className="file-input"
              onChange={handleFileChange}
              title="Attach files"
              style={{ display: 'none' }}  // Hide the actual input
            />

            {/* Display the file name next to the paperclip icon */}
            {attachment && (
              <span className="file-name">{attachment.name}</span>
            )}
          </div>

          <div className="reply-box">
            <ReactQuill
              theme="snow"
              value={replyText}
              onChange={setReplyText}
              placeholder="Add a reply..."
              modules={modules} // Use the defined modules
              formats={['header', 'bold', 'italic', 'underline', 'list', 'link', 'image']} // Define formats
            />
          </div>

          {/* Submit Button */}
          <button className="send-btn" onClick={handleReplySubmit}>Send</button>
        </div>
      </div>

      <div className="ticket-right">
        <h2>Ticket Metadata</h2>
        <br></br>
        <br></br>
        
        <p><strong>Ticket ID:</strong> {ticket.id}</p>
        
        <p><strong>Created Date:</strong> {ticket.time}</p>
        <p><strong>Last Update :</strong> {ticket.lastUpdate}</p>
        
        {/* Displaying Priority as Text */}
        
          <p><strong>Priority:</strong> {ticket.priority}</p>
       

        {/* Displaying Status as Text */}
        
          <p><strong>Action:</strong> {ticket.status}</p>
       
        
        {/* Displaying Engineer Name */}
        
          <p><strong>Engineer:</strong> {ticket.engineer}</p>
       
      </div>
    </div>
  );
}

export default TicketDetail;
