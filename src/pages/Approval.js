import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Approval/Approval.css';

function Approval() {
  const [tickets] = useState([
    { id: 1, subject: 'Bluetooth not working', engineer: 'ABC1', status: 'Open', time: '20 Aug 2024', priority: 'High' },
    { id: 2, subject: 'Shutdown Problem', engineer: 'Unassigned', status: 'Closed', time: '23 Aug 2024', priority: 'Medium' },
    { id: 3, subject: 'Display issue', engineer: 'XYZ2', status: 'Pending', time: '24 Aug 2024', priority: 'Low' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const navigate = useNavigate();

  const handleRowClick = (ticketId) => {
    navigate(`/tickets/view/${ticketId}`); // Directly navigate to the ticket view page
  };

  const filteredTickets = tickets.filter(ticket => {
    return (
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === '' || ticket.status === statusFilter) &&
      (priorityFilter === '' || ticket.priority === priorityFilter)
    );
  });

  return (
    <div className="tickets-container">
      <h1>Admin Ticket Management</h1>

      <div className="top-section">
        <div className="new-ticket-total-container">
          <div className="total-tickets">Total Tickets: {filteredTickets.length}</div>
        </div>
      </div>

      <div className="search-filter-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Subject"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>

          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="tickets-table-container">
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Subject</th>
              <th>Engineer</th>
              <th>Time</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.id} onClick={() => handleRowClick(ticket.id)}>
                <td>{ticket.id}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.engineer}</td>
                <td>{ticket.time}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.status}</td> {/* Status displayed as plain text */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Approval;
