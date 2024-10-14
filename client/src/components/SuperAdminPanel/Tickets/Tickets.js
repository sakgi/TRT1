import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tickets.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome for the arrow icon

function Tickets() {
  const [tickets, setTickets] = useState([
    { id: 1, requester: 'Vaishnavi', subject: 'Bluetooth not working', engineer: 'ABC1', status: 'Open', time: '20 Aug 2024', priority: 'High' },
    { id: 2, requester: 'Parth', subject: 'Shutdown Problem', engineer: 'Unassigned', status: 'Closed', time: '23 Aug 2024', priority: 'Medium' },
    { id: 3, requester: 'John', subject: 'Display issue', engineer: 'XYZ2', status: 'Pending', time: '24 Aug 2024', priority: 'Low' },
    { id: 4, requester: 'Priya', subject: 'Keyboard not working', engineer: 'ABC2', status: 'Open', time: '25 Aug 2024', priority: 'High' },
    { id: 5, requester: 'Amit', subject: 'Wi-Fi connectivity issue', engineer: 'XYZ3', status: 'Pending', time: '26 Aug 2024', priority: 'Medium' },
    { id: 6, requester: 'Rohan', subject: 'Battery drainage issue', engineer: 'Unassigned', status: 'Closed', time: '27 Aug 2024', priority: 'Low' },
    { id: 7, requester: 'Meera', subject: 'Overheating issue', engineer: 'ABC3', status: 'Open', time: '28 Aug 2024', priority: 'High' },
    { id: 8, requester: 'Anita', subject: 'Camera not working', engineer: 'XYZ1', status: 'Pending', time: '29 Aug 2024', priority: 'Low' },
    { id: 9, requester: 'Rahul', subject: 'Audio issue', engineer: 'ABC1', status: 'Closed', time: '30 Aug 2024', priority: 'Medium' },
    { id: 10, requester: 'Karan', subject: 'Touchscreen problem', engineer: 'XYZ2', status: 'Open', time: '1 Sept 2024', priority: 'High' },

    // ...rest of the tickets
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalClass, setTotalClass] = useState('');
  const ticketsPerPage = 10;

  const navigate = useNavigate();

  // Filter tickets based on search query and selected filters
  const filteredTickets = tickets.filter(ticket => {
    return (
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === '' || ticket.status === statusFilter) &&
      (priorityFilter === '' || ticket.priority === priorityFilter)
    );
  });

  // Pagination logic
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, Math.min(indexOfLastTicket, filteredTickets.length));

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
    if (pageNumber > totalPages) {
      setCurrentPage(totalPages);
    }
  };

  // Dynamic color and animation for total tickets
  useEffect(() => {
    const totalTickets = filteredTickets.length;

    if (totalTickets > 20) {
      setTotalClass('high');
    } else if (totalTickets > 10) {
      setTotalClass('medium');
    } else {
      setTotalClass('low');
    }

    const totalElement = document.querySelector('.total-tickets');
    if (totalElement) {
      totalElement.classList.add('pulse');
      setTimeout(() => {
        totalElement.classList.remove('pulse');
      }, 1000);
    }
  }, [filteredTickets.length]);

  // Handle routing to the general ticket details page
  const handleArrowClick = () => {
    navigate('/SuperAdminDashboard/ticket-detail');
  };

  return (
    <div className="tickets-container">
      <div className="header-area">
        {/* <h1>Tickets List</h1> */}
      </div>

      <div className="top-section">
        <div className="new-ticket-total-container">
          <button className="new-ticket" onClick={() => navigate('/SuperAdminDashboard/new-ticket')}>
            Create New Ticket
          </button>
          <div className={`total-tickets ${totalClass}`}>
            <span className="ticket-icon">🎟️</span>
            <h3>Total Tickets: {filteredTickets.length}</h3>
          </div>
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
          <div className="filter-item">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="filter-item">
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
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
              <th>Status</th>
              <th>Time</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.requester}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.engineer}</td>
                <td>
                  <select value={ticket.status} onChange={(e) => setTickets(prev =>
                    prev.map(t => t.id === ticket.id ? { ...t, status: e.target.value } : t)
                  )}>
                    <option value="Open">Open</option>
                    <option value="Pending">Pending</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
                <td>{ticket.time}</td>
                <td>{ticket.priority}</td>
                <td>
                  <i className="fas fa-arrow-right" onClick={handleArrowClick} style={{ cursor: 'pointer' }}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tickets;