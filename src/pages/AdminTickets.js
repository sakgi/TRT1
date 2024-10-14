import React, { useState } from 'react';
import { FaBars, FaTicketAlt, FaUsers, FaFileAlt, FaCheckCircle, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; 
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'; 
// import './css/AdminTickets.css';
// import './css/AdminTicketsResponsive.css';
import './css/AdminTickets/AdminTickets.css';
import './css/AdminTickets/AdminTicketsResponsive.css';

function Sidebar({ isOpen, handleLogout }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="top-section">
        <ul>
          <li>
            <Link to="tickets">
              <FaTicketAlt className="icon" />
              <span>Tickets</span>
            </Link>
          </li>
          <li>
            <Link to="engineering">
              <FaUsers className="icon" />
              <span>Engineer</span>
            </Link>
          </li>
          <li>
            <Link to="report-generation">
              <FaFileAlt className="icon" />
              <span>Report Generation</span>
            </Link>
          </li>
          <li>
            <Link to="approval">
              <FaCheckCircle className="icon" />
              <span>My Tickets</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="bottom-section">
        <ul>
          <li className="profile">
            <Link to="profile">
              <FaUserCircle className="icon" />
              <span>Profile</span>
            </Link>
          </li>
          <li className="logout" onClick={handleLogout}>
            <FaSignOutAlt className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}


function AdminTickets() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const isSpecialRoute = location.pathname.includes('/admin-tickets/new-ticket') || 
                         location.pathname.includes('/admin-tickets/add-engineer');

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="admin-tickets-container">
      {!isSpecialRoute && (
        <>
          <div className="hamburger" onClick={toggleSidebar}>
            <FaBars />
          </div>

          <Sidebar isOpen={isSidebarOpen} handleLogout={handleLogout} />
        </>
      )}

      <div className={`content ${isSidebarOpen && !isSpecialRoute ? 'sidebar-open' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminTickets;
