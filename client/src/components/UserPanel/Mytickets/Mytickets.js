import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Make sure react-router-dom is installed
import { useTickets } from '../addTicket/TicketContext'; // Ensure this path is correct
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Chip,
  Grid,
  Avatar,
} from '@mui/material'; // Ensure Material-UI components are correctly imported
import { Event, Attachment } from '@mui/icons-material'; // Ensure these icons are imported
import Sidebar from '../Sidebar/Sidebar'; // Make sure this path is correct as well
import './Mytickets.css'; // Ensure you have the CSS file in the correct location

const TicketDetails = () => {
  const { ticketId } = useParams();
  const { tickets } = useTickets();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tickets.length > 0) {
      setLoading(false);
    }
  }, [tickets]);

  // Log the ticketId from the URL
  console.log('ticketId from URL:', ticketId);

  // Log the list of tickets
  console.log('Tickets:', tickets);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Ensure the ticketId is compared as a string
  const ticket = tickets.find((ticket) => ticket.id === ticketId);

  // Log if we found the ticket
  console.log('Found ticket:', ticket);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (!ticket) return <Typography variant="h6" color="error">Ticket not found.</Typography>;

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" className="ticket-details-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`ticket-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Paper elevation={4} className="ticket-details-paper">
          <Typography variant="h4" className="ticket-title" gutterBottom>
            {ticket.subject}
          </Typography>
          <Typography variant="subtitle1" className="ticket-date">
            <Event fontSize="small" /> Created on: {ticket.created}
          </Typography>

          <Divider className="divider-spacing" />

          <div className="ticket-details-content">
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6">Description:</Typography>
                <Typography className="ticket-description">{ticket.description}</Typography>

                <Divider className="divider-spacing" />

                <div style={{ marginTop: '150px' }}>
                  <Typography variant="h6">Reply:</Typography>
                  <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter Message..."
                    className="reply-input"
                  />
                  <Button variant="contained" color="primary" className="send-button">Send</Button>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper className="ticket-info">
                  <Typography variant="h6">Ticket Info</Typography>
                  <Divider className="divider-spacing" />
                  <Typography><strong>Device Type:</strong> {ticket.deviceType}</Typography>
                  <Typography><strong>Ticket ID:</strong> {ticket.id}</Typography>
                  <Typography>
                    <strong>Status:</strong> <Chip label={ticket.status} color="primary" size="small" />
                  </Typography>
                  <Typography>
                    <strong>Priority:</strong> 
                    <Chip label={ticket.priority} color={getPriorityColor(ticket.priority)} size="small" />
                  </Typography>
                  <Typography><strong>Issue Type:</strong> {ticket.issueType}</Typography>
                  <Typography>
                    <Attachment fontSize="small" /> <strong>Attached File:</strong>
                    {ticket.attachment && (
                      <a href={URL.createObjectURL(ticket.attachment)} target="_blank" rel="noopener noreferrer">
                        View Attachment
                      </a>
                    )}
                  </Typography>
                </Paper>

                <Divider className="divider-spacing" />

                <div className="ticket-responsibility">
                  <Typography variant="h6">Responsibility</Typography>
                  <Avatar>{ticket.assignedTo ? ticket.assignedTo[0] : 'N/A'}</Avatar>
                  <Typography>Name: {ticket.assignedTo || 'Not assigned'}</Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </Container>
  );
};

export default TicketDetails;

