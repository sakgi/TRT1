import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuperAdminMyTickets.css';
// import logo from '../assets/logo.png';

function Approval() {
  const [tickets] = useState([
    { id: 1, subject: 'Bluetooth not working', engineer: 'ABC1', status: 'Open', time: '20 Aug 2024', priority: 'High' },
    { id: 2, subject: 'Shutdown Problem', engineer: 'Unassigned', status: 'Closed', time: '23 Aug 2024', priority: 'Medium' },
    { id: 3, subject: 'Display issue', engineer: 'XYZ2', status: 'Pending', time: '24 Aug 2024', priority: 'Low' },
    { id: 4, subject: 'Network issue', engineer: 'DEF3', status: 'Open', time: '25 Aug 2024', priority: 'High' },
    { id: 5, subject: 'Software Installation', engineer: 'GHI4', status: 'Closed', time: '26 Aug 2024', priority: 'Medium' },
    { id: 6, subject: 'Printer not working', engineer: 'JKL5', status: 'Pending', time: '27 Aug 2024', priority: 'Low' },
    { id: 7, subject: 'Hardware failure', engineer: 'MNO6', status: 'Open', time: '28 Aug 2024', priority: 'High' },
    { id: 8, subject: 'Email configuration', engineer: 'PQR7', status: 'Closed', time: '29 Aug 2024', priority: 'Medium' },
    { id: 9, subject: 'Password reset', engineer: 'STU8', status: 'Pending', time: '30 Aug 2024', priority: 'Low' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  const navigate = useNavigate();

  // Handle click on the arrow button
  const handleArrowClick = (ticketId) => {
    navigate(`/SuperAdminDashboard/viewticket`); // Navigate to the ticket view page
  };

  const filteredTickets = tickets.filter(ticket => {
    return (
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === '' || ticket.status === statusFilter) &&
      (priorityFilter === '' || ticket.priority === priorityFilter)
    );
  });

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="tickets-container">
      <div className="header-area">
        <h1>
          {/* <span className="header-text">My Tickets</span> */}
          <span style={{ flexGrow: 1 }}></span>
          {/* <img src={logo} alt="Logo" className="header-logo" /> */}
        </h1>
      </div>

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
              <th>Action</th> {/* New column for the arrow button */}
            </tr>
          </thead>
          <tbody>
            {currentTickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.engineer}</td>
                <td>{ticket.time}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.status}</td>
                <td>
                  <button
                    className="arrow-button"
                    onClick={() => handleArrowClick(ticket.id)}
                  >
                    ➡️
                  </button> {/* Arrow button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Approval;
