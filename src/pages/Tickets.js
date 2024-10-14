import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './css/Tickets/Tickets.css'; // Ensure path is correct

function Tickets() {
  const [tickets, setTickets] = useState([
    { id: 1, requester: 'Vaishnavi', subject: 'Bluetooth not working', engineer: 'ABC1', status: 'Open', time: '20 Aug 2024', priority: 'High' },
    { id: 2, requester: 'Parth', subject: 'Shutdown Problem', engineer: 'Unassigned', status: 'Closed', time: '23 Aug 2024', priority: 'Medium' },
    { id: 3, requester: 'John', subject: 'Display issue', engineer: 'XYZ2', status: 'Pending', time: '24 Aug 2024', priority: 'Low' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const navigate = useNavigate(); // Initialize the navigate hook

  const handleNewTicketClick = () => {
    navigate('/admin-tickets/new-ticket'); // Navigate to the New Ticket page
  };

  useEffect(() => {
    // Simulate fetching data from a server
    // setTickets(fetchTicketsFromServer());
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === id) {
        return { ...ticket, status: newStatus };
      }
      return ticket;
    });
    setTickets(updatedTickets);
  };

  const filteredTickets = tickets.filter(ticket => {
    return (
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === '' || ticket.status === statusFilter) &&
      (priorityFilter === '' || ticket.priority === priorityFilter)
    );
  });

  const handleRowClick = (ticketId) => {
    navigate(`/tickets/${ticketId}`); // Navigate to the ticket details page
  };

  return (
    <div className="tickets-container">
    <div class="header-area">
      <h1>Admin Ticket Management</h1>
</div>
      <div className="top-section">
        <div className="new-ticket-total-container">
          <button className="new-ticket" onClick={handleNewTicketClick}>Create New Ticket</button>
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
              <th>Requester</th>
              <th>Subject</th>
              <th>Engineer</th>
              <th>Time</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.id} onClick={() => handleRowClick(ticket.id)}>
                <td>{ticket.id}</td>
                <td>{ticket.requester}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.engineer}</td>
                <td>{ticket.time}</td>
                <td>{ticket.priority}</td>
                <td>
                  <select
                    value={ticket.status}
                    onClick={(e) => e.stopPropagation()} // Prevents row click
                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="Pending">Pending</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tickets;
