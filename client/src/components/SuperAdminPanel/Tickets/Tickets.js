import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Tickets.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { db } from '../../../firebase/firebaseconfig'; // Import initialized Firebase instance
import { collection, query, where, getDocs } from "firebase/firestore";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalClass, setTotalClass] = useState('');
  const [role, setRole] = useState(''); // State to store user role
  const ticketsPerPage = 10;

  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve role from sessionStorage
  useEffect(() => {
    const userRole = sessionStorage.getItem("userRole") || 'Admin'; // Default to 'Admin' if not found
    setRole(userRole);
  }, []);

  // Fetch tickets based on role
  useEffect(() => {
    const employeeId = sessionStorage.getItem("employeeId");
    console.log("Fetching tickets from Firebase:", employeeId);
    console.log("User  Role:", role);

    const fetchTickets = async () => {
      try {
        if (role === 'SuperAdmin') {
          const response = await fetch('http://localhost:1760/allticketsbyrole', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
          }

          const data = await response.json();
          console.log("API Response:", data);

          if (data.tickets) {
            const sortedTickets = data.tickets.sort((a, b) => {
              const timeA = new Date(`${a.date} ${a.time}`).getTime();
              const timeB = new Date(`${b.date} ${b.time}`).getTime();
              return timeB - timeA; // Descending order
            });

            setTickets(sortedTickets);
          } else {
            console.error('No tickets found');
          }
        } else if (role === 'Admin') {
          const ticketsRef = collection(db, "TicketList");
          const q = query(ticketsRef, where("assignedId", "==", employeeId));
          const querySnapshot = await getDocs(q);

          const adminTickets = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          const sortedTickets = adminTickets.sort((a, b) => {
            const timeA = new Date(`${a.date} ${a.time}`).getTime();
            const timeB = new Date(`${b.date} ${b.time}`).getTime();
            return timeB - timeA; // Descending order
          });

          setTickets(sortedTickets);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        alert(`Failed to fetch tickets: ${error.message}. Please try again later.`);
      }
    };

    fetchTickets();
  }, [role]);

  // Apply filters
  const filteredTickets = tickets.filter(ticket => {
    return (
      (ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || '') &&
      (statusFilter === '' || ticket.status === statusFilter) &&
      (priorityFilter === '' || ticket.priority === priorityFilter)
    );
  });

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, Math.min(indexOfLastTicket, filteredTickets.length));
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      setTimeout(() => totalElement.classList.remove(' pulse'), 1000);
    }
  }, [filteredTickets.length]);

  const handleArrowClick = (ticketId, ticket) => {
    navigate(`/SuperAdminDashboard/ticket-detail/${ticketId}`, { state: { ticket } });
  };

  return (
    <div className="tickets-container">
      <div className="header-area"></div>

      <div className="top-section">
        <div className="new-ticket-total-container">
          <button className="new-ticket" onClick={() => navigate('/SuperAdminDashboard/new-ticket')}>
            Create New Ticket
          </button>
          <div className="total-tickets-trt">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="ticket-icon-trt">🎟️</span>
              <h3>Total Tickets: {filteredTickets.length}</h3>
            </div>
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
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="Raised">Raised</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
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
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Raised Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td className="wrap-text">{ticket.subject}</td>
                <td className="wrap-text">{ticket.assignedTo || 'Unassigned'}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.date}</td>
                <td>{ticket.time}</td>
                <td>
                  <button
                    className="arrow-button"
                    onClick={() => handleArrowClick(ticket.id, ticket)}
                  >
                    ➡️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array(totalPages)
            .fill(0)
            .map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Tickets;