import React, { useState } from 'react';
import './TicketDetails.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TicketDetail() {
  const [status, setStatus] = useState('Open');
  const [priority, setPriority] = useState('Low');
  const [action, setAction] = useState('Open');
  const [replyText, setReplyText] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isAssigningEngineer, setIsAssigningEngineer] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState('Unassigned');

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
    toolbar: false,
  };

  const handleAssignEngineerClick = () => {
    setIsAssigningEngineer(true);
  };

  const handleEngineerSelect = (engineer) => {
    setSelectedEngineer(engineer);
    setIsAssigningEngineer(false);
  };

  return (
    <div className="ticket-container">
      <div className="ticket-left">
        <h2>Ticket Details</h2>
        <p><strong>Subject:</strong> Bluetooth not working</p>
        <p><strong>Device Type:</strong> Laptop</p>
        <p><strong>Issue Type:</strong> Hardware</p>
        <p><strong>Description:</strong> Bluetooth not detecting devices</p>

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
              style={{ display: 'none' }} 
            />

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
              modules={modules}
              formats={['header', 'bold', 'italic', 'underline', 'list', 'link', 'image']}
            />
          </div>

          <button className="send-btn" onClick={handleReplySubmit}>Send</button>
        </div>
      </div>

      <div className="ticket-right">
        <h2>Ticket Metadata</h2>
        <p><strong>Created Date:</strong> 20 Aug 2024</p>
        <p><strong>Last Update Date:</strong> 21 Aug 2024</p>

        <div className="ticket-priority">
          <label htmlFor="priority"><strong>Priority:</strong></label>
          <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="ticket-action">
          <label htmlFor="action"><strong>Action:</strong></label>
          <select id="action" value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="responsibility-section">
          <p><strong>Responsibility:</strong></p>
          {selectedEngineer === 'Unassigned' ? (
            <>
              <button className="assign-btn" onClick={handleAssignEngineerClick}>Assign Engineer</button>
              {isAssigningEngineer && (
                <select
                  className="engineer-dropdown"
                  value={selectedEngineer}
                  onChange={(e) => handleEngineerSelect(e.target.value)}
                >
                  <option value="abc1">abc1</option>
                  <option value="abc2">abc2</option>
                  <option value="abc3">abc3</option>
                </select>
              )}
            </>
          ) : (
            <p>{selectedEngineer}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;
