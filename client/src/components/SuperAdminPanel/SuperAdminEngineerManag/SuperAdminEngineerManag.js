import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import './SuperAdminEngineerManag.css';
// import logo from '../assets/logo.png';

function Engineering() {
  const [engineers, setEngineers] = useState([
    { id: 1, Ticketid: 1, name: 'John Doe', roll: 'ENG123', status: 'Active' },
    { id: 2, Ticketid: 2, name: 'Jane Smith', roll: 'ENG456', status: 'Inactive' },
    { id: 3, Ticketid: 3, name: 'Emily Johnson', roll: 'ENG789', status: 'Active' },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddEngineerClick = () => {
    navigate('/SuperAdminDashboard/add-engineer');
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this engineer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedEngineers = engineers.filter((engineer) => engineer.id !== id);
        setEngineers(updatedEngineers);
        Swal.fire('Deleted!', 'The engineer has been deleted.', 'success');
      }
    });
  };

  const filteredEngineers = engineers.filter((engineer) =>
    engineer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="engineering-container">
     <div className="header-area">
      <h1>
      {/* <span className="header-text"> Engineer Management </span> */}
 
 
  <span style={{flexGrow: 1}}></span>
  {/* <img src={logo} alt="Logo" className="header-logo" /> */}
</h1>
      </div>

      <div className="top-section">
        <button className="add-engineer" onClick={handleAddEngineerClick}>
          Add Engineer
        </button>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-icon">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="engineering-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Name</th>
              <th>Roll</th>
              <th>Status</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {filteredEngineers.length > 0 ? (
              filteredEngineers.map((engineer) => (
                <tr key={engineer.id}>
                  <td>{engineer.Ticketid}</td>
                  <td>{engineer.name}</td>
                  <td>{engineer.roll}</td>
                  <td>{engineer.status}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(engineer.id)}
                    >
                      Delete Account
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No engineers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* This Outlet renders only if the path is not for add-engineer */}
      {location.pathname !== '/admin-tickets/add-engineer' && <Outlet />}
    </div>
  );
}

export default Engineering;
